"use client";

import { motion } from "framer-motion";
import { Stethoscope, ShieldCheck, MapPin, BadgeIndianRupee } from "lucide-react";

const REASONS = [
  {
    icon: Stethoscope,
    title: "Doctor-First Marketing",
    description:
      "Our dedicated Medical Representatives build direct relationships with doctors and specialists, ensuring Supracyn brands are front-of-mind at the prescription pad.",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-100",
    accentText: "text-blue-600",
    accentHover: "group-hover:bg-blue-100",
  },
  {
    icon: ShieldCheck,
    title: "WHO-GMP Certified Sourcing",
    description:
      "Every Supracyn-branded product is sourced exclusively from CDSCO-approved, WHO-GMP certified manufacturing partners — so every batch meets the highest safety standards.",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-100",
    accentText: "text-emerald-600",
    accentHover: "group-hover:bg-emerald-100",
  },
  {
    icon: MapPin,
    title: "Pan-India Distribution",
    description:
      "From Telangana to Delhi NCR, our distribution network ensures Supracyn products are available at pharmacies and hospital dispensaries across all major Indian states.",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-100",
    accentText: "text-orange-600",
    accentHover: "group-hover:bg-orange-100",
  },
  {
    icon: BadgeIndianRupee,
    title: "Affordable Quality",
    description:
      "We believe every Indian deserves access to quality branded medicines. Supracyn formulations are priced to reach patients across all income groups without compromise.",
    accentBg: "bg-purple-50",
    accentBorder: "border-purple-100",
    accentText: "text-purple-600",
    accentHover: "group-hover:bg-purple-100",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            The Supracyn Difference
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Why Doctors &amp; Distributors Choose Supracyn
          </h2>
          <p className="text-lg text-slate-600">
            We are not just another pharma company. We are a brand-first marketing organisation built around four core commitments.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className={`group relative bg-white rounded-2xl border ${reason.accentBorder} p-7 flex flex-col space-y-4 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                {/* Number accent */}
                <div
                  className={`h-14 w-14 rounded-2xl ${reason.accentBg} ${reason.accentHover} flex items-center justify-center ${reason.accentText} transition-colors duration-300 flex-shrink-0`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{reason.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
