import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getProducts } from "@/lib/supabase-products";
import { supabaseServerClient } from "@/lib/supabase-server";

// ---------------------------------------------------------------------------
// Validation schema — limit input length to prevent abuse
// ---------------------------------------------------------------------------
const suggestSchema = z.object({
  q: z.string().min(2).max(100).transform((s) => s.trim()),
  category: z.string().max(50).optional(),
  form: z.string().max(30).optional(),
  // Accept "true" / "false" as strings from the query param; default to "true"
  active_only: z
    .union([z.literal("true"), z.literal("false")])
    .optional()
    .default("true"),
});

// ---------------------------------------------------------------------------
// GET /api/products/suggest?q=...&category=...&form=...&active_only=...
// Returns up to 8 product suggestions for type-ahead search.
// Use active_only=false for portal admin (include inactive products).
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = suggestSchema.safeParse({
    q: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? undefined,
    form: searchParams.get("form") ?? undefined,
    active_only: searchParams.get("active_only") ?? "true",
  });

  if (!parsed.success) {
    return NextResponse.json({ products: [], total: 0 }, { status: 200 });
  }

  const { q, category, form, active_only } = parsed.data;
  const activeOnlyBool = active_only !== "false";

  let products: Array<{ id: number; name: string; composition: string; category: string; form: string }>;
  let total: number;

  if (activeOnlyBool) {
    const result = await getProducts({
      search: q,
      category: category && category !== "all" ? category : undefined,
      form: form && form !== "all" ? form : undefined,
      limit: 8,
      page: 1,
    });
    products = result.data;
    total = result.total;
  } else {
    // Portal: include inactive products via RPC
    if (!supabaseServerClient) {
      return NextResponse.json({ products: [], total: 0 }, { status: 200 });
    }
    const { data: rows, error } = await supabaseServerClient.rpc("search_products", {
      search_query: q,
      filter_category: category && category !== "all" ? category : null,
      filter_active_only: false,
      result_limit: 8,
      result_offset: 0,
    });
    if (error) {
      return NextResponse.json({ products: [], total: 0 }, { status: 200 });
    }
    const items = (rows ?? []) as Array<Record<string, unknown>>;
    total = (items[0]?.total_count as number) ?? 0;
    products = items.map((r) => ({
      id: r.id as number,
      name: (r.name as string) ?? "",
      composition: (r.composition as string) ?? "",
      category: (r.category as string) ?? "",
      form: (r.form as string) ?? "",
    }));
  }

  return NextResponse.json({
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      composition: p.composition,
      category: p.category,
      form: p.form,
    })),
    total,
  });
}
