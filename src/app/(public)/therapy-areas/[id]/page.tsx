import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/blocks/page-header";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { therapyAreas } from "@/data/therapy-areas";
import {
  getProducts,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type Product,
} from "@/lib/supabase-products";

export const revalidate = 3600;

export async function generateStaticParams() {
  return therapyAreas.map((area) => ({ id: area.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const area = therapyAreas.find((a) => a.id === id);
  if (!area) {
    return {
      title: "Therapy Area | Supracyn Pharma",
      description:
        "Explore Supracyn Pharma therapy areas and discover our branded product portfolio.",
    };
  }
  const title = `${area.name} | Supracyn Pharma`;
  const description = area.description;
  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `https://supracynpharma.com/therapy-areas/${area.id}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://supracynpharma.com/therapy-areas/${area.id}`,
    },
  };
}

export default async function TherapyAreaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const area = therapyAreas.find((a) => a.id === id);
  if (!area) notFound();

  const { data: products } = await getProducts({ category: id, limit: 50 });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://supracynpharma.com" },
          { name: "Therapy Areas", url: "https://supracynpharma.com/therapy-areas" },
          { name: area.name, url: `https://supracynpharma.com/therapy-areas/${area.id}` },
        ]}
      />

      <PageHeader
        title={area.name}
        subtitle={area.description}
        breadcrumbs={[
          { label: "Therapy Areas", href: "/therapy-areas" },
          { label: area.name },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              {area.name} Products
            </h2>
            <Link
              href="/therapy-areas"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Therapy Areas
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No products found in this therapy area.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p: Product) => {
                const c = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS.miscellaneous;
                const categoryLabel = CATEGORY_LABELS[p.category] ?? p.category;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className={`group bg-white rounded-2xl border ${c.border} p-5 flex flex-col space-y-3 hover:shadow-md transition-all duration-200 cursor-pointer`}
                  >
                    <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                      {p.form}
                    </span>
                    <div className="font-bold text-slate-900 text-sm leading-snug group-hover:text-primary transition-colors">
                      {p.name}
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {p.composition}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="font-semibold">{categoryLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mt-auto bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-lg">Need help with sourcing?</div>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Can&apos;t find a specific formulation? Reach out — we&apos;ll check availability across our network.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors shadow"
          >
            Contact Us <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

