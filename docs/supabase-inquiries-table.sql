-- Supabase table for storing website inquiries from Supracyn Pharma

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  company text not null,
  email text not null,
  phone text not null,
  message text not null,
  type text not null check (type in ('general', 'partnership', 'product')),
  partnership_type text,
  product text,
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

