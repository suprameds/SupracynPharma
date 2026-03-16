"use client";

import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, MapPin, BadgeIndianRupee } from "lucide-react";

const REASONS = [
  {
    icon: Stethoscope,
    number: "01",
    title: "Doctor-First Marketing",
    description:
      "Our dedicated Medical Representatives build direct relationships with doctors and specialists, ensuring Supracyn brands are front-of-mind at the prescription pad.",
    gradient: "from-blue-500 to-indigo-500",
    glow: "group-hover:shadow-blue-500/20",
    border: "hover:border-blue-500/30",
    accent: "#3b82f6",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "WHO-GMP Certified Sourcing",
    description:
      "Every Supracyn-branded product is sourced exclusively from CDSCO-approved, WHO-GMP certified manufacturing partners — so every batch meets the highest safety standards.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
    border: "hover:border-emerald-500/30",
    accent: "#10b981",
  },
  {
    icon: MapPin,
    number: "03",
    title: "Pan-India Distribution",
    description:
      "From Telangana to Delhi NCR, our distribution network ensures Supracyn products reach pharmacies and hospital dispensaries across all major Indian states.",
    gradient: "from-orange-500 to-amber-500",
    glow: "group-hover:shadow-orange-500/20",
    border: "hover:border-orange-500/30",
    accent: "#f97316",
  },
  {
    icon: BadgeIndianRupee,
    number: "04",
    title: "Affordable Quality",
    description:
      "We believe every Indian deserves quality branded medicines. Supracyn formulations are priced to reach patients across all income groups without compromise.",
    gradient: "from-purple-500 to-pink-500",
    glow: "group-hover:shadow-purple-500/20",
    border: "hover:border-purple-500/30",
    accent: "#a855f7",
  },
];

const STATS = [
  { value: "600+", label: "Formulations" },
  { value: "10+",  label: "Years Active" },
  { value: "4",    label: "GMP Partners" },
  { value: "10+",  label: "States Covered" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">

      {/* ── Ambient background orbs ───────────────────────────────── */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* ── Section header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
            The Supracyn Difference
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            Why Doctors &amp; Distributors{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #34d399 100%)" }}
            >
              Choose Supracyn
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            A brand-first marketing organisation built around four core commitments
            to quality, reach, and affordability across India.
          </p>
        </motion.div>

        {/* ── Stats ribbon ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/60 rounded-2xl overflow-hidden mb-14 border border-slate-800"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-900/80 py-6 px-4 text-center">
              <div
                className="text-3xl font-extrabold mb-1"
                style={{
                  backgroundImage: "linear-gradient(135deg, #60a5fa, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Reason cards ─────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
                className={`group relative rounded-2xl border border-slate-800 ${reason.border} bg-slate-900/70 backdrop-blur-sm p-7 flex flex-col space-y-4 cursor-default overflow-hidden transition-all duration-300 hover:shadow-2xl ${reason.glow}`}
              >
                {/* Corner glow on hover */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                  style={{ background: reason.accent }}
                  aria-hidden="true"
                />

                {/* Number watermark — decorative only, stays in bottom-right corner */}
                <span
                  className="absolute bottom-3 right-4 text-4xl font-black select-none pointer-events-none leading-none"
                  style={{ color: "rgba(255,255,255,0.06)" }}
                  aria-hidden="true"
                >
                  {reason.number}
                </span>

                {/* Icon */}
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center text-white shadow-lg`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {reason.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
