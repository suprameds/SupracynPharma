import { Hero } from "@/components/blocks/hero";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";
import { ProductCard } from "@/components/blocks/product-card";
import { products } from "@/data/products";
import { therapyAreas } from "@/data/therapy-areas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Activity,
  Brain,
  ShieldPlus,
  Stethoscope,
  Wind,
  Pill,
  type LucideIcon,
} from "lucide-react";

/** Maps the iconName strings used in therapy-areas data to Lucide components */
const THERAPY_ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Brain,
  ShieldPlus,
  Stethoscope,
  Wind,
  Pill,
};

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero
        title="Quality Medicines. The Supracyn Brand."
        subtitle="Founded in Hyderabad in 2014, Supracyn Pharma markets safe, effective, and affordable branded medicines across India — trusted by doctors and patients alike."
      />

      {/* 2. Trust Signals */}
      <TrustSignalsStrip />

      {/* Presence Across India strip */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Present Across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {[
              { flag: "🏙️", region: "Telangana" },
              { flag: "🏙️", region: "Andhra Pradesh" },
              { flag: "🏙️", region: "Maharashtra" },
              { flag: "🏙️", region: "Karnataka" },
              { flag: "🏙️", region: "Tamil Nadu" },
              { flag: "🏙️", region: "Delhi NCR" },
              { flag: "🏙️", region: "Gujarat" },
              { flag: "🏙️", region: "Rajasthan" },
            ].map(({ flag, region }) => (
              <div key={region} className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <span className="text-xl" aria-hidden="true">{flag}</span>
                {region}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Supracyn Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                The Supracyn Brand — Built on Quality and Trust
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Supracyn Pharma markets a comprehensive range of branded pharmaceutical products across India. Our products — each carrying the Supracyn name — are sourced from WHO-GMP certified partner facilities and meet stringent safety and efficacy standards.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Branded formulations across 7 therapy areas",
                  "Products sourced from WHO-GMP certified facilities",
                  "Trusted by doctors, hospitals, and pharmacies",
                  "Available across major states pan-India"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Discover Our Story
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] bg-slate-100 rounded-2xl border flex items-center justify-center p-8 text-center relative z-10 overflow-hidden shadow-lg">
                <Image src="/images/facility_infrastructure.png" alt="Supracyn Headquarters" fill className="object-cover" />
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
            {therapyAreas.slice(0, 6).map((area) => {
              const Icon = THERAPY_ICON_MAP[area.iconName] ?? Pill;
              return (
              <div key={area.id} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{area.name}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2">{area.description}</p>
                <Link href={`/therapy-areas#${area.id}`} className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Explore Products <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            );
            })}
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

      {/* 6. Distribution Partnership Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Bring Supracyn to Your Market
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                We are actively looking for distribution and institutional partners to carry Supracyn-branded products across India. If you are a distributor, pharmacy chain, or hospital network looking for a quality pharmaceutical brand, let&apos;s talk.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-slate-400 font-medium">Approved Formulations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">7+</div>
                  <div className="text-sm text-slate-400 font-medium">Therapy Areas</div>
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
              Order Supracyn Products Online
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mx-auto max-w-2xl">
              Supracyn products are available for direct online purchase through our dedicated consumer platform. Visit <strong className="text-slate-900">Suprameds.in</strong> for safe, verified home delivery of your trusted Supracyn medicines.
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
