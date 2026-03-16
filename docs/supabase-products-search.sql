-- Postgres full-text search for products table
-- Run in Supabase SQL Editor to enable faster, ranked search across name and composition.
-- After running, the app will use search_products RPC when available; otherwise falls back to ilike.

-- 1. Add generated tsvector column for full-text search
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(composition, '')), 'B')
) STORED;

-- 2. Create GIN index for fast FTS queries
CREATE INDEX IF NOT EXISTS products_search_vector_idx
ON public.products USING GIN (search_vector);

-- 3. RPC for full-text search with ranking (optional; app has ilike fallback)
-- Drop first so we can change the return type (rank → search_rank, id int → bigint)
DROP FUNCTION IF EXISTS public.search_products(text, text, boolean, integer, integer);

CREATE OR REPLACE FUNCTION public.search_products(
  search_query text,
  filter_category text DEFAULT NULL,
  filter_active_only boolean DEFAULT false,
  result_limit int DEFAULT 30,
  result_offset int DEFAULT 0
)
RETURNS TABLE (
  id bigint,
  name text,
  composition text,
  category text,
  form text,
  is_featured boolean,
  is_active boolean,
  created_at timestamptz,
  total_count bigint,
  search_rank real
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  ts_query tsquery;
  total bigint;
BEGIN
  -- Build tsquery; handle empty/malformed input
  search_query := trim(coalesce(search_query, ''));
  IF search_query = '' THEN
    search_query := '*';  -- Match all when no search term
  END IF;
  -- Use prefix matching so "ca" matches "Calcium", "Carvedilol", etc.
  -- Each word becomes word:* (e.g. "ca" -> ca:*, "vit d" -> vit:* & d:*)
  ts_query := (
    SELECT to_tsquery('simple', string_agg(word || ':*', ' & ' ORDER BY ord))
    FROM (
      SELECT word, row_number() OVER () AS ord
      FROM unnest(regexp_split_to_array(lower(search_query), '\s+')) AS word
      WHERE length(word) >= 1 AND word ~ '^[a-z0-9\-]+$'
    ) w
  );
  IF ts_query IS NULL THEN
    ts_query := to_tsquery('simple', ':*');
  END IF;

  RETURN QUERY
  WITH filtered AS (
    SELECT p.*,
           ts_rank(p.search_vector, ts_query) AS rk
    FROM public.products p
    WHERE (search_query = '*' OR p.search_vector @@ ts_query)
      AND (filter_category IS NULL OR filter_category = 'all' OR p.category = filter_category)
      AND (NOT filter_active_only OR p.is_active = true)
  ),
  counted AS (
    SELECT COUNT(*) OVER () AS cnt FROM filtered
  )
  SELECT
    f.id::bigint,
    f.name::text,
    coalesce(f.composition, '')::text,
    coalesce(f.category, '')::text,
    coalesce(f.form, '')::text,
    coalesce(f.is_featured, false)::boolean,
    coalesce(f.is_active, true)::boolean,
    f.created_at::timestamptz,
    ((SELECT cnt FROM counted LIMIT 1))::bigint,
    f.rk::real
  FROM filtered f
  ORDER BY f.rk DESC NULLS LAST, f.name ASC
  LIMIT result_limit
  OFFSET result_offset;
END;
$$;

-- Grant execute to anon and service_role (adjust as per your RLS)
GRANT EXECUTE ON FUNCTION public.search_products TO anon;
GRANT EXECUTE ON FUNCTION public.search_products TO authenticated;
GRANT EXECUTE ON FUNCTION public.search_products TO service_role;
