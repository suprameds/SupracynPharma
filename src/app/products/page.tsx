import { PageHeader } from "@/components/blocks/page-header";
import { products } from "@/data/products";
import { therapyAreas } from "@/data/therapy-areas";
import { ProductCard } from "@/components/blocks/product-card";

export const metadata = {
  title: "Product Portfolio | Supracyn Pharma",
  description: "Explore our diverse portfolio of high-quality pharmaceutical formulations across multiple therapeutic segments.",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader 
        title="Our Portfolio" 
        subtitle="A comprehensive range of high-quality formulations designed to meet diverse therapeutic needs and elevate patient care globally."
        breadcrumbs={[
          { label: "Products" }
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Filters Placeholder */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Therapy Areas</h3>
                <ul className="space-y-2">
                  <li>
                    <button className="text-sm font-medium text-primary w-full text-left py-1 hover:text-primary transition-colors">
                      All Areas
                    </button>
                  </li>
                  {therapyAreas.map(area => (
                    <li key={area.id}>
                      <button className="text-sm text-slate-600 w-full text-left py-1 hover:text-primary transition-colors">
                        {area.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Dosage Forms</h3>
                <ul className="space-y-2">
                  {["Tablets", "Capsules", "Syrups", "Injectables"].map(form => (
                    <li key={form}>
                      <label className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                        <span>{form}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center text-sm text-slate-600">
                <span>Showing {products.length} products</span>
                {/* Sort Dropdown Placeholder */}
                <select className="border-slate-200 rounded-md py-1.5 pl-3 pr-8 text-sm focus:ring-primary focus:border-primary">
                  <option>A-Z</option>
                  <option>Therapy Area</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </div>
  );
}
