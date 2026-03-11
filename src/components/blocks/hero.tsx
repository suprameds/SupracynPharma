"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Globe, Award } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imagePlaceholder?: boolean;
}

const STATS = [
  { icon: ShieldCheck, label: "WHO-GMP Certified" },
  { icon: Award, label: "500+ Formulations" },
  { icon: Globe, label: "25+ Countries" },
];

export function Hero({
  title,
  subtitle,
  primaryCtaText = "Partner Inquiry",
  primaryCtaLink = "/partnerships",
  secondaryCtaText = "Explore Portfolio",
  secondaryCtaLink = "/products",
  imagePlaceholder = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">

      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 40%, oklch(0.97 0.01 255) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 self-start bg-primary/5 border border-primary/15 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              A Trusted Pharmaceutical Brand
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={primaryCtaLink}>
                <Button size="lg" className="w-full sm:w-auto text-base h-13 px-8 shadow-md shadow-primary/20">
                  {primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={secondaryCtaLink}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-13 px-8">
                  {secondaryCtaText}
                </Button>
              </Link>
            </div>

            {/* Inline social-proof stats */}
            <div className="flex flex-wrap gap-6 pt-2 border-t border-slate-100">
              {STATS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Icon className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image with floating card */}
          {imagePlaceholder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              {/* Main image */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl shadow-slate-200">
                <Image
                  src="/images/hero_corporate.png"
                  alt="Supracyn Pharma manufacturing facility"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" aria-hidden="true" />
              </div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex gap-6"
              >
                {[
                  { value: "1B+", label: "Tablets / Year" },
                  { value: "25+", label: "Countries" },
                  { value: "500+", label: "Formulations" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5 whitespace-nowrap">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Decorative blurs */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
              <div className="absolute -z-10 -top-8 -left-8 w-72 h-72 bg-accent/10 rounded-full blur-3xl" aria-hidden="true" />
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
