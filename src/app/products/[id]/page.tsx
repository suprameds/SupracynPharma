import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/blocks/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/products" },
    { label: product.name }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title={product.name} 
        subtitle={product.genericName}
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Product Image & Badges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="aspect-square bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center overflow-hidden relative shadow-inner">
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} packaging`}
                  fill
                  className="object-cover p-8"
                  // Fall back gracefully if the per-product image hasn't been added yet
                  onError={undefined}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1 text-sm bg-slate-100 text-slate-800 uppercase tracking-wider font-semibold">
                  {product.therapyAreaId.replace("-", " ")}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm text-primary border-primary/20">
                  {product.dosageForm}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> GMP Certified
                </Badge>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Summary */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Product Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.summary}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Strength</h3>
                  <p className="text-lg font-medium text-slate-900">{product.strength}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Pack Size</h3>
                  <p className="text-lg font-medium text-slate-900">{product.packSize}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Therapy Area</h3>
                  <p className="text-lg font-medium text-slate-900 capitalize">{product.therapyAreaId.replace("-", " ")}</p>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Key Highlights</h2>
                <ul className="space-y-3">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Storage & Disclaimers */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Packaging & Storage</h2>
                <p className="text-slate-600">
                  {product.packagingStorage}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Link href={`/partnerships?product=${product.id}`}>
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                    Business Inquiry
                  </Button>
                </Link>
                
                {product.isAvailableOnline && (
                  <a href="https://suprameds.in" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base group">
                      Buy via Suprameds <ArrowUpRight className="ml-2 h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                    </Button>
                  </a>
                )}
              </div>

              <div className="pt-8 border-t border-slate-100 mt-12">
                <p className="text-xs text-slate-400 italic">
                  Disclaimer: The information provided is for educational and business reference purposes only. It is not intended for diagnostic or treatment guidance. Please consult a registered medical practitioner before using any medication.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Back to Products */}
      <div className="bg-slate-50 py-8 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Link href="/products" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Full Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
