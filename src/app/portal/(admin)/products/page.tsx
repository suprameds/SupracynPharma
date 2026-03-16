import Link from "next/link";
import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase-server";
import { CATEGORY_LABELS } from "@/lib/supabase-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortalProductSearch } from "./_components/portal-product-search";

type SearchParams = {
  search?: string;
  category?: string;
  page?: string;
};

type ProductRow = {
  id: number;
  name: string;
  composition: string | null;
  category: string | null;
  form: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string;
};

const PAGE_SIZE = 30;

async function getProducts(params: SearchParams): Promise<{
  data: ProductRow[];
  total: number;
  page: number;
}> {
  if (!supabaseServerClient) return { data: [], total: 0, page: 1 };
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const category = params.category?.toString();
  const search = params.search?.toString()?.trim();

  // Use full-text search RPC when searching
  if (search) {
    const { data: rows, error } = await supabaseServerClient.rpc("search_products", {
      search_query: search,
      filter_category: category && category !== "all" ? category : null,
      filter_active_only: false, // Admin: show all products including inactive
      result_limit: PAGE_SIZE,
      result_offset: from,
    });
    if (error) {
      console.error("[portal products] search_products RPC error:", error.message);
      return { data: [], total: 0, page };
    }
    const items = (rows ?? []) as ProductRow[];
    const total = (items[0] as unknown as { total_count?: number })?.total_count ?? 0;
    const data = items.map((r) => ({
      id: r.id,
      name: r.name,
      composition: r.composition,
      category: r.category,
      form: r.form,
      is_featured: r.is_featured,
      is_active: r.is_active,
      created_at: r.created_at,
    }));
    return { data, total, page };
  }

  // No search: standard list
  let query = supabaseServerClient
    .from("products")
    .select("*", { count: "exact" })
    .order("name", { ascending: true })
    .range(from, from + PAGE_SIZE - 1);

  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  const { data, count } = await query;
  return { data: (data ?? []) as ProductRow[], total: count ?? 0, page };
}

export async function toggleFeatured(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const desired = String(formData.get("desired")) === "true";
  if (!supabaseServerClient || !Number.isFinite(id)) return;
  await supabaseServerClient
    .from("products")
    .update({ is_featured: desired })
    .eq("id", id);
  revalidatePath("/portal/products");
}

export async function toggleActive(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const desired = String(formData.get("desired")) === "true";
  if (!supabaseServerClient || !Number.isFinite(id)) return;
  await supabaseServerClient
    .from("products")
    .update({ is_active: desired })
    .eq("id", id);
  revalidatePath("/portal/products");
}

function buildProductsUrl(params: SearchParams, pageNum: number): string {
  const q = new URLSearchParams();
  if (params.search) q.set("search", params.search);
  if (params.category && params.category !== "all") q.set("category", params.category);
  q.set("page", String(pageNum));
  const qs = q.toString();
  return `/portal/products${qs ? `?${qs}` : ""}`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { data, total, page } = await getProducts(params);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const prevUrl = buildProductsUrl(params, page - 1);
  const nextUrl = buildProductsUrl(params, page + 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          <PortalProductSearch
            defaultSearch={params.search ?? ""}
            defaultCategory={params.category ?? "all"}
          />
          <Link href="/portal/products/new">
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg ring-1 ring-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Category
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Form
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Featured
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Active
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">
                    {p.composition}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <Badge variant="outline">
                    {p.category ? CATEGORY_LABELS[p.category] ?? p.category : "-"}
                  </Badge>
                </td>
                <td className="px-4 py-2">{p.form ?? "-"}</td>
                <td className="px-4 py-2">
                  <form action={toggleFeatured} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="desired"
                      value={String(!p.is_featured)}
                    />
                    <Button size="sm" variant="secondary" type="submit">
                      {p.is_featured ? "Yes (Unfeature)" : "No (Feature)"}
                    </Button>
                  </form>
                </td>
                <td className="px-4 py-2">
                  <form action={toggleActive} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="desired"
                      value={String(!p.is_active)}
                    />
                    <Button size="sm" variant="outline" type="submit">
                      {p.is_active ? "Active → Deactivate" : "Inactive → Activate"}
                    </Button>
                  </form>
                </td>
                <td className="px-4 py-2 text-right"></td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-500" colSpan={6}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Page {page} of {totalPages} • {total} total
        </div>
        <div className="flex items-center gap-2">
          {page <= 1 ? (
            <Button variant="outline" size="sm" disabled>Previous</Button>
          ) : (
            <Link href={prevUrl}>
              <Button variant="outline" size="sm">Previous</Button>
            </Link>
          )}
          {page >= totalPages ? (
            <Button variant="outline" size="sm" disabled>Next</Button>
          ) : (
            <Link href={nextUrl}>
              <Button variant="outline" size="sm">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

