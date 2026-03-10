import { Hero } from "@/components/blocks/hero";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";
import { ProductCard } from "@/components/blocks/product-card";
import { products } from "@/data/products";
import { therapyAreas } from "@/data/therapy-areas";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero 
        title="Pioneering Excellence in Global Healthcare."
        subtitle="Supracyn Pharma is a trusted multinational pharmaceutical manufacturer dedicated to rigorous quality standards and innovative formulations."
      />

      {/* 2. Trust Signals */}
      <TrustSignalsStrip />

      {/* 3. About Supracyn Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                A Legacy of Trust and Manufacturing Excellence
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                For over two decades, Supracyn Pharma has been at the forefront of pharmaceutical manufacturing. We operate stringent WHO-GMP certified facilities, ensuring that every molecule we produce meets the highest global standards for safety, efficacy, and purity.
              </p>
              <ul className="space-y-3 pt-4">
                {["State-of-the-art R&D facilities", "Stringent quality control protocols", "Global regulatory compliance", "Scalable production capabilities"].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Discover Our Corporate Journey
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] bg-slate-100 rounded-2xl border flex items-center justify-center p-8 text-center relative z-10 overflow-hidden shadow-lg">
                <Image src="/images/hero_corporate.png" alt="Supracyn Headquarters" fill className="object-cover" />
              </div>
              <div className="absolute top-8 -right-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Therapy Areas */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Therapeutic Mastery
              </h2>
              <p className="text-lg text-slate-600">
                Our diverse portfolio spans across critical therapeutic segments, supported by targeted research and robust clinical backing.
              </p>
            </div>
            <Link href="/therapy-areas">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5">
                View All Areas <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapyAreas.slice(0, 6).map((area) => (
              <div key={area.id} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-300">
                  <span className="text-sm font-medium">Icon</span> {/* Assuming dynamic lucide import is tricky in generic map, using placeholder */}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{area.name}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2">{area.description}</p>
                <Link href={`/therapy-areas#${area.id}`} className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Explore Products <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Featured Portfolio
              </h2>
              <p className="text-lg text-slate-600">
                A selection of our high-demand formulations trusted by healthcare professionals and institutions globally.
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                Browse Full Portfolio
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Manufacturing / Partner Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Partner for Scale, Quality, and Reliability
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Supracyn Pharma is actively expanding its global footprint. We invite distributors, hospital networks, pharmacy chains, and private label partners to collaborate with a manufacturer that guarantees consistent quality and robust supply chain security.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-slate-400 font-medium">Approved Formulations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-slate-400 font-medium">Export Countries</div>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/partnerships">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground border-none">
                    Initiate Partnership
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-slate-800/50 aspect-square rounded-2xl border border-slate-700/50 flex items-center justify-center p-6 text-center backdrop-blur-sm relative overflow-hidden">
                  <Image src="/images/facility_infrastructure.png" alt="Manufacturing Facility" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-slate-800/50 aspect-[4/5] rounded-2xl border border-slate-700/50 flex items-center justify-center p-6 text-center backdrop-blur-sm relative overflow-hidden">
                  <Image src="/images/packaging_robotics.png" alt="Automated Packaging" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-slate-800/50 aspect-[4/5] rounded-2xl border border-slate-700/50 flex items-center justify-center p-6 text-center backdrop-blur-sm relative overflow-hidden">
                  <Image src="/images/laboratory_qc.png" alt="Quality Control Lab" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-slate-800/50 aspect-square rounded-2xl border border-slate-700/50 flex items-center justify-center p-6 text-center backdrop-blur-sm relative overflow-hidden">
                  <Image src="/images/logistics_distribution.png" alt="Logistics and Distribution" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Suprameds Bridge */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-white p-10 md:p-16 rounded-3xl border shadow-sm">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground font-semibold text-sm tracking-wide uppercase mb-2">
              Direct to Consumer Access
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Looking to Purchase Online?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mx-auto max-w-2xl">
              While Supracyn Pharma operates as our corporate manufacturing entity, we provide a secure, separate eCommerce portal for direct purchases. Visit <strong className="text-slate-900">Suprameds.in</strong> to securely order our trusted products online.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/buy-suprameds">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn About Suprameds
                </Button>
              </Link>
              <a href="https://suprameds.in" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white">
                  Visit Suprameds.in <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
