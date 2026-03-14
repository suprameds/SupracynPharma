"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Supracyn's anti-infective and cardiac range has become my go-to choice for Indian patients. The quality is consistent batch after batch, and my patients appreciate that the medicines are always available at local pharmacies.",
    name: "Dr. Rajesh Nair",
    title: "MD, General Medicine",
    location: "Apollo Clinic, Hyderabad",
    initials: "RN",
    color: "bg-primary text-primary-foreground",
  },
  {
    quote:
      "I regularly prescribe Supracyn's gynaecology and vitamin range. Their Medical Representatives are knowledgeable and genuinely helpful — not just pushing numbers. That trust translates into my confidence in recommending the brand.",
    name: "Dr. Kavitha Reddy",
    title: "MBBS, DNB — Gynaecologist",
    location: "Rainbow Hospitals, Bangalore",
    initials: "KR",
    color: "bg-rose-600 text-white",
  },
  {
    quote:
      "As a pharmacy owner, I stock Supracyn products because customers ask for them by name. Replenishment is fast and the brand recognition among patients keeps growing every month.",
    name: "Mr. Parveen Mehta",
    title: "Registered Pharmacist",
    location: "Sadar Bazaar Pharmacy, Delhi NCR",
    initials: "PM",
    color: "bg-emerald-600 text-white",
  },
  {
    quote:
      "We partnered with Supracyn as a regional distributor 3 years ago. The product portfolio is wide enough to serve all our clinic accounts, and the team support on logistics and claims is genuinely responsive.",
    name: "Mr. Suresh Patel",
    title: "Regional Pharmaceutical Distributor",
    location: "Ahmedabad, Gujarat",
    initials: "SP",
    color: "bg-amber-600 text-white",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            What They Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Trusted by Doctors, Pharmacists &amp; Distributors
          </h2>
          <p className="text-lg text-slate-600">
            The Supracyn brand earns trust at every touchpoint — from the prescription pad to the pharmacy shelf.
          </p>
        </div>

        {/* Testimonial grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col space-y-5 hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote icon */}
              <div className="text-primary/20">
                <Quote className="h-8 w-8" strokeWidth={1.5} />
              </div>

              <p className="text-slate-700 text-base leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-2 border-t border-slate-200">
                <div
                  className={`h-11 w-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${t.color}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.title}</div>
                  <div className="text-xs text-primary font-medium">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
