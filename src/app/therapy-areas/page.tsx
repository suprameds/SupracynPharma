import { PageHeader } from "@/components/blocks/page-header";
import { therapyAreas } from "@/data/therapy-areas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Pill,
  Activity,
  Heart,
  HeartPulse,
  Microscope,
  ShieldPlus,
  Brain,
  Wind,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Therapy Areas | Supracyn Pharma",
  description:
    "Explore Supracyn Pharma's 7 therapy areas — Cardiology, Diabetology, Anti-Infectives, Gynaecology, Pain Management, Vitamins & Nutrition, and Gastroenterology.",
};

/** Unique accent color per therapy area — visually distinct at a glance */
const THERAPY_COLORS: Record<
  string,
  {
    iconBg: string;
    iconText: string;
    border: string;
    badge: string;
    cta: string;
    number: string;
  }
> = {
  cardiology: {
    iconBg: "bg-rose-100",
    iconText: "text-rose-600",
    border: "border-rose-200",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    cta: "text-rose-600 hover:text-rose-700",
    number: "text-rose-200",
  },
  diabetology: {
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    border: "border-blue-200",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    cta: "text-blue-600 hover:text-blue-700",
    number: "text-blue-200",
  },
  "anti-infectives": {
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    border: "border-emerald-200",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cta: "text-emerald-600 hover:text-emerald-700",
    number: "text-emerald-200",
  },
  gynaecology: {
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    border: "border-purple-200",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    cta: "text-purple-600 hover:text-purple-700",
    number: "text-purple-200",
  },
  "pain-management": {
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    border: "border-orange-200",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    cta: "text-orange-600 hover:text-orange-700",
    number: "text-orange-200",
  },
  "vitamins-nutrition": {
    iconBg: "bg-amber-100",
    iconText: "text-amber-600",
    border: "border-amber-200",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    cta: "text-amber-600 hover:text-amber-700",
    number: "text-amber-200",
  },
  gastroenterology: {
    iconBg: "bg-teal-100",
    iconText: "text-teal-600",
    border: "border-teal-200",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    cta: "text-teal-600 hover:text-teal-700",
    number: "text-teal-200",
  },
};

const DEFAULT_COLORS = {
  iconBg: "bg-primary/10",
  iconText: "text-primary",
  border: "border-primary/20",
  badge: "bg-primary/5 text-primary border-primary/20",
  cta: "text-primary hover:text-primary/80",
  number: "text-primary/20",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Activity,
  Brain,
  ShieldPlus,
  Stethoscope,
  Wind,
  Pill,
  Heart,
  HeartPulse,
  Microscope,
};

export default function TherapyAreasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader
        title="Therapy Areas"
        subtitle="Seven high-demand therapeutic segments. One trusted brand. Explore the Supracyn portfolio across the health conditions that matter most."
        breadcrumbs={[{ label: "Therapy Areas" }]}
      />

      {/* Therapy grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {therapyAreas.map((area, index) => {
              const Icon = ICON_MAP[area.iconName] ?? Pill;
              const colors = THERAPY_COLORS[area.id] ?? DEFAULT_COLORS;

              return (
                <article
                  key={area.id}
                  id={area.id}
                  className={`group bg-white rounded-2xl border ${colors.border} overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <Image
                      src={area.imageUrl}
                      alt={area.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Large number watermark */}
                    <div
                      className={`absolute top-3 left-4 text-8xl font-black leading-none ${colors.number} select-none pointer-events-none`}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Therapy badge */}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${colors.badge}`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {area.name}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 space-y-4">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl ${colors.iconBg} ${colors.iconText} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 leading-tight pt-1">
                        {area.name}
                      </h2>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>

                    <p className="text-slate-500 text-sm">
                      Supracyn formulations in this segment are manufactured under strict WHO-GMP
                      guidelines by our certified manufacturing partners, ensuring every batch
                      meets quality and efficacy standards.
                    </p>

                    {/* CTA */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <Link href={`/products?therapy=${area.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`group/btn border-current ${colors.cta} hover:bg-transparent`}
                        >
                          View Products
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                      <Link
                        href="/contact"
                        className={`text-xs font-semibold ${colors.cta} transition-colors`}
                      >
                        Inquire →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Looking for a Specific Therapy?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Browse our full product portfolio or send us a partnership enquiry — our team responds
            within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Full Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 bg-transparent"
              >
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
