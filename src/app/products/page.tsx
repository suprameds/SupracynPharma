import { PageHeader } from "@/components/blocks/page-header";
import { ProductsFilter } from "@/components/blocks/products-filter";
import { products } from "@/data/products";
import { therapyAreas } from "@/data/therapy-areas";

export const metadata = {
  title: "Product Portfolio | Supracyn Pharma",
  description: "Explore our diverse portfolio of high-quality pharmaceutical formulations across multiple therapeutic segments.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { therapy?: string };
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader
        title="Our Portfolio"
        subtitle="A comprehensive range of high-quality formulations designed to meet diverse therapeutic needs and elevate patient care globally."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* ProductsFilter is a client component that owns all filter/sort state */}
          <ProductsFilter
            products={products}
            therapyAreas={therapyAreas}
            initialTherapy={searchParams.therapy}
          />
        </div>
      </section>
    </div>
  );
}
