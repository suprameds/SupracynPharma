"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Award, MapPin, Phone } from "lucide-react";
import { useRef } from "react";

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
  { icon: Award, label: "600+ Formulations" },
  { icon: MapPin, label: "Pan-India" },
];

/** Floating decorative orb */
function Orb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-40 ${className}`}
      aria-hidden="true"
    />
  );
}

export function Hero({
  title,
  subtitle,
  primaryCtaText = "Partner Inquiry",
  primaryCtaLink = "/partnerships",
  secondaryCtaText = "Explore Portfolio",
  secondaryCtaLink = "/products",
  imagePlaceholder = true,
}: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse-tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Image moves subtly opposite to mouse
  const imageX = useTransform(springX, [-300, 300], ["-12px", "12px"]);
  const imageY = useTransform(springY, [-300, 300], ["-8px", "8px"]);

  // Floating card moves with mouse
  const cardX = useTransform(springX, [-300, 300], ["8px", "-8px"]);
  const cardY = useTransform(springY, [-300, 300], ["4px", "-4px"]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32"
    >
      {/* ── Animated gradient mesh background ─────────────────────────── */}
      <Orb className="w-[600px] h-[600px] bg-blue-200 top-[-200px] right-[-100px] animate-[pulse_8s_ease-in-out_infinite]" />
      <Orb className="w-[400px] h-[400px] bg-primary/20 bottom-[-100px] left-[-80px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <Orb className="w-[300px] h-[300px] bg-indigo-200 top-[40%] right-[30%] animate-[pulse_12s_ease-in-out_infinite_4s]" />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left — text ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start bg-primary/5 border border-primary/15 text-primary text-sm font-semibold px-4 py-1.5 rounded-full"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              A Trusted Pharmaceutical Brand · Est. 2014
            </motion.div>

            <div className="space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]"
              >
                {/* Gradient on first line */}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #0ea5e9 100%)",
                  }}
                >
                  Quality Medicines.
                </span>
                <br />
                <span className="text-slate-900">The Supracyn Brand.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={primaryCtaLink}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                >
                  {primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={secondaryCtaLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 border-slate-300 hover:border-primary/40 hover:bg-primary/5"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
              <a
                href="tel:+917032427651"
                className="hidden sm:flex items-center gap-2 px-5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </motion.div>

            {/* Inline stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-2 border-t border-slate-100"
            >
              {STATS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-slate-500 font-medium"
                >
                  <Icon className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — parallax image ────────────────────────────────── */}
          {imagePlaceholder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              {/* Main image with mouse parallax */}
              <motion.div
                style={{ x: imageX, y: imageY }}
                className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl shadow-slate-300/60"
              >
                <Image
                  src="/images/hero_corporate.png"
                  alt="Supracyn Pharma manufacturing facility"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,23,42,0.35) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Glassmorphism floating stats card */}
              <motion.div
                style={{
                  x: cardX,
                  y: cardY,
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                className="absolute -bottom-6 -left-8 rounded-2xl p-4 flex gap-6 border border-white/60 shadow-xl"
              >
                {[
                  { value: "600+", label: "Formulations" },
                  { value: "7+", label: "Therapy Areas" },
                  { value: "2014", label: "Est. Hyderabad" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-xl font-bold"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5 whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Floating pill badge top-right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                WHO-GMP Certified
              </motion.div>

              {/* Decorative blurs */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="absolute -z-10 -top-8 -left-8 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" aria-hidden="true" />
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
