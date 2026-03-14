import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProductCategory =
  | "diabetology"
  | "cardiology"
  | "cholesterol"
  | "anti-infectives"
  | "hormones"
  | "nutraceuticals"
  | "urology"
  | "neurology"
  | "nephrology"
  | "gastroenterology"
  | "miscellaneous";

export type ProductForm =
  | "Tab"
  | "Cap"
  | "Syrup"
  | "Gel"
  | "Ointment"
  | "Drops"
  | "Cream"
  | "Spray"
  | "Sachet"
  | "Lotion"
  | "Powder"
  | "Gargle"
  | "Inhaler"
  | "Soap"
  | string;

export interface Product {
  id: number;
  name: string;
  composition: string;
  category: ProductCategory;
  form: ProductForm;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface CategoryCount {
  category: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Client
// Use a public anon key — products are public read; no auth needed on browser.
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

// ---------------------------------------------------------------------------
// Query helpers — all server-side (no "use client")
// ---------------------------------------------------------------------------

export interface GetProductsOptions {
  category?: string;
  search?: string;
  form?: string;
  limit?: number;
  page?: number;
}

const PAGE_SIZE = 30;

/** Fetch paginated products with optional category / full-text search filters. */
export async function getProducts(
  opts: GetProductsOptions = {}
): Promise<{ data: Product[]; total: number }> {
  const client = getClient();
  if (!client) return { data: [], total: 0 };

  const { category, search, form, limit = PAGE_SIZE, page = 1 } = opts;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = client
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_active", true)
    .order("name", { ascending: true })
    .range(from, to);

  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  if (form && form !== "all") {
    query = query.eq("form", form);
  }
  if (search && search.trim()) {
    // Full-text search on the indexed tsvector column (simple dictionary)
    query = query.textSearch("name", search.trim(), {
      type: "websearch",
      config: "simple",
    });
  }

  const { data, count, error } = await query;
  if (error) {
    console.error("[supabase-products] getProducts error:", error.message);
    return { data: [], total: 0 };
  }
  return { data: (data ?? []) as Product[], total: count ?? 0 };
}

/** Fetch a handful of featured products for the homepage spotlight. */
export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("category", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[supabase-products] getFeaturedProducts error:", error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

/** Return the product count per category for the filter sidebar. */
export async function getCategoryCounts(): Promise<CategoryCount[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client.rpc("get_product_category_counts").select("*");
  if (error) {
    // Fallback: manual count via group — RPC may not exist yet
    const { data: raw } = await client
      .from("products")
      .select("category")
      .eq("is_active", true);

    if (!raw) return [];
    const counts: Record<string, number> = {};
    for (const row of raw) {
      counts[row.category] = (counts[row.category] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }
  return data ?? [];
}

/** Human-readable labels for each category slug. */
export const CATEGORY_LABELS: Record<string, string> = {
  diabetology: "Diabetology",
  cardiology: "Cardiology",
  cholesterol: "Cholesterol",
  "anti-infectives": "Anti-Infectives",
  hormones: "Hormones & Gynaecology",
  nutraceuticals: "Nutraceuticals",
  urology: "Urology",
  neurology: "Neurology",
  nephrology: "Nephrology",
  gastroenterology: "Gastroenterology",
  miscellaneous: "Miscellaneous",
};

/** Accent colour per category for the UI. */
export const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; border: string; badge: string }
> = {
  diabetology: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  cardiology: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
  cholesterol: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  "anti-infectives": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  hormones: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
  nutraceuticals: {
    bg: "bg-lime-50",
    text: "text-lime-700",
    border: "border-lime-200",
    badge: "bg-lime-100 text-lime-700",
  },
  urology: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
  },
  neurology: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
  },
  nephrology: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-700",
  },
  gastroenterology: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  miscellaneous: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-700",
  },
};
