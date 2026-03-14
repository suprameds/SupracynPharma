import { Hero } from "@/components/blocks/hero";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";
import { AnimatedStats } from "@/components/blocks/animated-stats";
import { WhyUs } from "@/components/blocks/why-us";
import { Testimonials } from "@/components/blocks/testimonials";
import { getFeaturedProducts, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/supabase-products";
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
  FileDown,
  Mail,
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

/** Unique accent color per therapy area — makes the grid scannable at a glance */
const THERAPY_COLORS: Record<
  string,
  { bg: string; text: string; border: string; hoverBg: string; dot: string }
> = {
  cardiology: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-100 hover:border-rose-300",
    hoverBg: "group-hover:bg-rose-100",
    dot: "bg-rose-500",
  },
  diabetology: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100 hover:border-blue-300",
    hoverBg: "group-hover:bg-blue-100",
    dot: "bg-blue-500",
  },
  "anti-infectives": {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100 hover:border-emerald-300",
    hoverBg: "group-hover:bg-emerald-100",
    dot: "bg-emerald-500",
  },
  gynaecology: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100 hover:border-purple-300",
    hoverBg: "group-hover:bg-purple-100",
    dot: "bg-purple-500",
  },
  "pain-management": {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100 hover:border-orange-300",
    hoverBg: "group-hover:bg-orange-100",
    dot: "bg-orange-500",
  },
  "vitamins-nutrition": {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100 hover:border-amber-300",
    hoverBg: "group-hover:bg-amber-100",
    dot: "bg-amber-500",
  },
  gastroenterology: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    border: "border-teal-100 hover:border-teal-300",
    hoverBg: "group-hover:bg-teal-100",
    dot: "bg-teal-500",
  },
};

const DEFAULT_COLORS = {
  bg: "bg-primary/5",
  text: "text-primary",
  border: "border-primary/10 hover:border-primary/30",
  hoverBg: "group-hover:bg-primary/10",
  dot: "bg-primary",
};

/** Indian state pill badges */
const INDIA_STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi NCR",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "Uttar Pradesh",
];

const STATE_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-rose-100 text-rose-700",
  "bg-orange-100 text-orange-700",
  "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700",
  "bg-red-100 text-red-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
  "bg-lime-100 text-lime-700",
];

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <Hero
        title="Quality Medicines. The Supracyn Brand."
        subtitle="Founded in Hyderabad in 2014, Supracyn Pharma markets safe, effective, and affordable branded medicines across India — trusted by doctors and patients alike."
      />

      {/* 2. Animated Stats Bar */}
      <AnimatedStats />

      {/* 3. Trust Signals */}
      <TrustSignalsStrip />

      {/* 4. Why Supracyn */}
      <WhyUs />

      {/* 5. Present Across India — Colourful state pills */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            🇮🇳 &nbsp;Present Across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {INDIA_STATES.map((state, i) => (
              <span
                key={state}
                className={`${STATE_COLORS[i % STATE_COLORS.length]} text-xs font-semibold px-4 py-1.5 rounded-full`}
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About Supracyn Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                The Supracyn Brand — Built on Quality and Trust
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Supracyn Pharma markets a comprehensive range of branded pharmaceutical products
                across India. Our products — each carrying the Supracyn name — are sourced from
                WHO-GMP certified partner facilities and meet stringent safety and efficacy
                standards.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Branded formulations across 7 therapy areas",
                  "Products sourced from WHO-GMP certified facilities",
                  "Trusted by doctors, hospitals, and pharmacies",
                  "Available across major states pan-India",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 flex flex-wrap gap-3">
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Discover Our Story
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg">
                    Browse Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] bg-slate-100 rounded-2xl border flex items-center justify-center p-8 text-center relative z-10 overflow-hidden shadow-lg">
                <Image
                  src="/images/facility_infrastructure.png"
                  alt="Supracyn Partner Manufacturing Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-8 -right-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Therapy Areas — colour-coded grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Our Portfolio
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Therapeutic Coverage
              </h2>
              <p className="text-lg text-slate-600">
                Seven high-demand therapy areas. One trusted brand. Every formulation backed by
                WHO-GMP certified manufacturing.
              </p>
            </div>
            <Link href="/therapy-areas">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5">
                View All Therapy Areas <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {therapyAreas.map((area) => {
              const Icon = THERAPY_ICON_MAP[area.iconName] ?? Pill;
              const colors = THERAPY_COLORS[area.id] ?? DEFAULT_COLORS;
              return (
                <Link
                  key={area.id}
                  href={`/products?therapy=${area.id}`}
                  className={`group bg-white rounded-2xl border ${colors.border} p-6 flex flex-col space-y-4 shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`h-12 w-12 rounded-xl ${colors.bg} ${colors.hoverBg} flex items-center justify-center ${colors.text} transition-colors duration-300`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">{area.description}</p>
                  </div>
                  <div
                    className={`mt-auto inline-flex items-center text-xs font-semibold ${colors.text} gap-1`}
                  >
                    Explore Products <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}

            {/* Catch-all "View full portfolio" card */}
            <Link
              href="/products"
              className="group bg-primary rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
            >
              <div className="text-primary-foreground/70 text-sm font-medium mb-4">
                Full Portfolio
              </div>
              <div className="text-primary-foreground text-xl font-bold leading-snug mb-6">
                See all 500+ formulations
              </div>
              <div className="inline-flex items-center text-primary-foreground text-sm font-semibold gap-1">
                Browse Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Spotlight
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Featured Formulations
              </h2>
              <p className="text-lg text-slate-600">
                A selection of our high-demand Supracyn-branded products trusted by healthcare
                professionals across India.
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                Browse Full Portfolio
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const colors = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.miscellaneous;
              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl border ${colors.border} p-6 flex flex-col space-y-3 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <span className={`self-start text-[10px] font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
                    {CATEGORY_LABELS[product.category] ?? product.category}
                  </span>
                  <div className="font-bold text-slate-900 text-lg leading-snug">{product.name}</div>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{product.composition}</p>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-400">{product.form}</span>
                    <Link href={`/products?category=${product.category}`} className={`text-xs font-bold ${colors.text} hover:underline`}>
                      View Range →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Doctor Testimonials */}
      <Testimonials />

      {/* 10. Distribution Partnership */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                Partnership Opportunity
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Bring Supracyn to Your Market
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                We are actively looking for distribution and institutional partners to carry
                Supracyn-branded products across India. If you are a distributor, pharmacy chain,
                or hospital network looking for a quality pharmaceutical brand, let&apos;s talk.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { value: "500+", label: "Formulations" },
                  { value: "7+", label: "Therapy Areas" },
                  { value: "4", label: "GMP Partners" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-extrabold text-accent mb-1">{s.value}</div>
                    <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/partnerships">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
                  >
                    Initiate Partnership
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 bg-transparent"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-slate-800/50 aspect-square rounded-2xl border border-slate-700/50 relative overflow-hidden">
                  <Image
                    src="/images/facility_infrastructure.png"
                    alt="Manufacturing Facility"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="bg-slate-800/50 aspect-[4/5] rounded-2xl border border-slate-700/50 relative overflow-hidden">
                  <Image
                    src="/images/packaging_robotics.png"
                    alt="Automated Packaging"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-slate-800/50 aspect-[4/5] rounded-2xl border border-slate-700/50 relative overflow-hidden">
                  <Image
                    src="/images/laboratory_qc.png"
                    alt="Quality Control Lab"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="bg-slate-800/50 aspect-square rounded-2xl border border-slate-700/50 relative overflow-hidden">
                  <Image
                    src="/images/logistics_distribution.png"
                    alt="Logistics and Distribution"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Product Catalogue CTA */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                Get Our Full Product Catalogue
              </h3>
              <p className="text-primary-foreground/80 text-base">
                500+ Supracyn-branded formulations across 7 therapy areas — ready to distribute.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 border-0 shadow-lg font-semibold"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Request Catalogue
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 bg-transparent"
                >
                  Browse Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Suprameds Bridge */}
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
              Supracyn products are available for direct online purchase through our dedicated
              consumer platform. Visit{" "}
              <strong className="text-slate-900">Suprameds.in</strong> for safe, verified home
              delivery of your trusted Supracyn medicines.
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
