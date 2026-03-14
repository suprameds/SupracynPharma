import { PageHeader } from "@/components/blocks/page-header";
import { getProducts, getCategoryCounts, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/supabase-products";
import { ProductsFilter } from "@/components/blocks/products-filter";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Portfolio | Supracyn Pharma — 600+ Branded Formulations",
  description:
    "Browse 600+ Supracyn-branded pharmaceutical formulations across Cardiology, Diabetology, Neurology, Anti-Infectives, Gastroenterology and more. All WHO-GMP certified. Available across India.",
  alternates: { canonical: "https://supracynpharma.com/products" },
};

// Re-fetch on every request so filters work server-side
export const dynamic = "force-dynamic";

interface SearchParams {
  category?: string;
  search?: string;
  form?: string;
  page?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const category = params.category ?? "all";
  const search = params.search ?? "";
  const form = params.form ?? "all";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const [{ data: products, total }, categoryCounts] = await Promise.all([
    getProducts({ category: category !== "all" ? category : undefined, search, form: form !== "all" ? form : undefined, page }),
    getCategoryCounts(),
  ]);

  const totalPages = Math.ceil(total / 30);
  const activeColors = category !== "all" ? (CATEGORY_COLORS[category] ?? CATEGORY_COLORS.miscellaneous) : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://supracynpharma.com" },
          { name: "Products", url: "https://supracynpharma.com/products" },
          ...(category !== "all"
            ? [{ name: CATEGORY_LABELS[category] ?? category, url: `https://supracynpharma.com/products?category=${category}` }]
            : []),
        ]}
      />
      <PageHeader
        title="Product Portfolio"
        subtitle={`${total > 0 ? total.toLocaleString() : "600"}+ Supracyn-branded formulations across 11 therapy areas — all sourced from WHO-GMP certified partners.`}
        breadcrumbs={[{ label: "Products" }]}
      />

      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filter */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductsFilter
              categoryCounts={categoryCounts}
              activeCategory={category}
              activeSearch={search}
              activeForm={form}
            />
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Result header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {category !== "all" ? (CATEGORY_LABELS[category] ?? category) : "All Products"}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {total.toLocaleString()} {total === 1 ? "product" : "products"} found
                  {search ? ` for "${search}"` : ""}
                </p>
              </div>
              {activeColors && (
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${activeColors.badge}`}>
                  {CATEGORY_LABELS[category]}
                </span>
              )}
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
                <p className="text-slate-500 mb-6">
                  Try a different search term or clear your filters.
                </p>
                <Link
                  href="/products"
                  className="text-primary font-semibold hover:underline text-sm"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <>
                {/* Product table / list — clean pharma catalogue style */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <div className="col-span-4">Brand Name</div>
                    <div className="col-span-5">Composition</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-1">Form</div>
                  </div>

                  <div className="divide-y divide-slate-50">
                    {products.map((product) => {
                      const colors = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.miscellaneous;
                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 hover:bg-slate-50/80 hover:shadow-md rounded-xl transition-colors cursor-pointer"
                        >
                          {/* Brand name */}
                          <div className="md:col-span-4 flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full flex-shrink-0 ${colors.bg.replace("bg-", "bg-").replace("-50", "-400")}`} />
                            <span className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                              {product.name}
                            </span>
                          </div>

                          {/* Composition */}
                          <div className="md:col-span-5 text-slate-500 text-sm leading-relaxed pl-5 md:pl-0">
                            {product.composition}
                          </div>

                          {/* Category badge */}
                          <div className="md:col-span-2 pl-5 md:pl-0">
                            <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                              {CATEGORY_LABELS[product.category] ?? product.category}
                            </span>
                          </div>

                          {/* Form */}
                          <div className="md:col-span-1 pl-5 md:pl-0 text-xs text-slate-400 font-medium">
                            {product.form}
                          </div>

                          {/* View details indicator (mobile) */}
                          <div className="md:hidden col-span-full flex items-center gap-1 text-xs text-primary font-semibold pt-2">
                            View Details <ArrowRight className="h-3 w-3" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <PaginationLink
                        href={buildHref(params, page - 1)}
                        label="← Previous"
                      />
                    )}
                    <span className="text-sm text-slate-500 px-4">
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                      <PaginationLink
                        href={buildHref(params, page + 1)}
                        label="Next →"
                      />
                    )}
                  </div>
                )}
              </>
            )}

            {/* Inquiry CTA */}
            <div className="mt-10 rounded-2xl bg-primary p-6 md:p-8 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-lg">Can&apos;t find what you need?</div>
                <p className="text-primary-foreground/80 text-sm mt-1">
                  Our full catalogue has 600+ formulations. Reach out and we&apos;ll check availability.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors shadow"
              >
                Contact Us <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildHref(params: SearchParams, page: number): string {
  const q = new URLSearchParams();
  if (params.category && params.category !== "all") q.set("category", params.category);
  if (params.search) q.set("search", params.search);
  if (params.form && params.form !== "all") q.set("form", params.form);
  if (page > 1) q.set("page", String(page));
  const qs = q.toString();
  return `/products${qs ? `?${qs}` : ""}`;
}

function PaginationLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
    >
      {label}
    </Link>
  );
}
