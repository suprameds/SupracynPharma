import {
  getProductById,
  getRelatedProducts,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/supabase-products";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/blocks/page-header";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  FlaskConical,
  Pill,
  Phone,
} from "lucide-react";

// ---------------------------------------------------------------------------
// ISR — revalidate every hour; on-demand generation for all 622 products.
// We don't pre-generate at build time to keep deploys fast.
// ---------------------------------------------------------------------------
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return { title: "Product | Supracyn Pharma" };

  const product = await getProductById(numericId);
  if (!product) return { title: "Product | Supracyn Pharma" };

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const description = `${product.name} — ${product.composition}. A Supracyn Pharma branded ${categoryLabel} formulation. Available across India. For distribution enquiries contact us.`;

  return {
    title: `${product.name} | Supracyn Pharma`,
    description: description.slice(0, 160),
    alternates: {
      canonical: `https://supracynpharma.com/products/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | Supracyn Pharma`,
      description: description.slice(0, 160),
      url: `https://supracynpharma.com/products/${product.id}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) notFound();

  const [product, related] = await Promise.all([
    getProductById(numericId),
    // Fetch related in parallel — we'll have the product shortly
    Promise.resolve([] as Awaited<ReturnType<typeof getRelatedProducts>>),
  ]);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, product.id, 4);

  const colors = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.miscellaneous;
  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const productUrl = `https://supracynpharma.com/products/${product.id}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://supracynpharma.com" },
          { name: "Products", url: "https://supracynpharma.com/products" },
          { name: categoryLabel, url: `https://supracynpharma.com/products?category=${product.category}` },
          { name: product.name, url: productUrl },
        ]}
      />

      <PageHeader
        title={product.name}
        subtitle={product.composition}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: categoryLabel, href: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left — Info card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Visual identity card */}
              <div className={`rounded-3xl border ${colors.border} ${colors.bg} p-10 flex flex-col items-center justify-center text-center min-h-[240px] space-y-4`}>
                <div className={`h-16 w-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                  <FlaskConical className={`h-8 w-8 ${colors.text}`} strokeWidth={1.5} />
                </div>
                <div className={`font-black text-3xl leading-tight ${colors.text}`}>{product.name}</div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${colors.badge}`}>
                  {categoryLabel}
                </span>
              </div>

              {/* Quick specs */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Quick Reference</h3>
                <div className="space-y-3">
                  <SpecRow label="Dosage Form" value={product.form} />
                  <SpecRow label="Category" value={categoryLabel} />
                  <SpecRow label="Status" value="Available across India" highlight />
                  <SpecRow label="Sourcing" value="WHO-GMP Certified" highlight />
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-primary rounded-2xl p-6 text-primary-foreground space-y-4">
                <div className="font-bold text-lg">Interested in this product?</div>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                  Contact us for availability, pricing, and distribution partnership details.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 bg-white text-primary font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors"
                  >
                    Send Inquiry <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="tel:+919182027651"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    <Phone className="h-4 w-4" /> +91 91820 27651
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Composition + details */}
            <div className="lg:col-span-7 space-y-8">

              {/* Composition */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                  <h2 className="text-xl font-bold text-slate-900">Composition</h2>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {product.composition}
                  </p>
                </div>
              </div>

              {/* Dosage form */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Pill className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                  <h2 className="text-xl font-bold text-slate-900">Dosage Form</h2>
                </div>
                <p className="text-slate-600">{product.form}</p>
              </div>

              {/* Quality assurance */}
              <div className="border border-emerald-100 bg-emerald-50 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
                  <h2 className="font-bold text-emerald-900">Quality Assurance</h2>
                </div>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    Sourced exclusively from CDSCO-approved, WHO-GMP certified partners
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    Manufactured under strict GMP conditions supervised by qualified experts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    Part of Supracyn Pharma&apos;s branded portfolio — marketed across India since 2014
                  </li>
                </ul>
              </div>

              {/* Medical disclaimer */}
              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  <strong>Disclaimer:</strong> The information on this page is for educational and business reference purposes only. It is not intended for diagnostic, prescribing, or treatment guidance. For patient use, please consult a registered medical practitioner and refer to the approved prescribing information.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">
                More in {categoryLabel}
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className={`text-sm font-bold ${colors.text} hover:underline flex items-center gap-1`}
              >
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => {
                const c = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS.miscellaneous;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className={`group bg-white rounded-2xl border ${c.border} p-5 flex flex-col space-y-3 hover:shadow-md transition-all duration-200`}
                  >
                    <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                      {p.form}
                    </span>
                    <div className="font-bold text-slate-900 text-sm leading-snug group-hover:text-primary transition-colors">
                      {p.name}
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{p.composition}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-slate-500 hover:text-primary transition-colors font-medium gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Full Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function SpecRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      <span
        className={`text-sm font-bold ${
          highlight ? "text-emerald-700" : "text-slate-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
