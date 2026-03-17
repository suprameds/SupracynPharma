"use client";

import Image from "next/image";
import type { Partner } from "@/data/partners";

interface PartnerStripProps {
  partners: Partner[];
}

export function PartnerStrip({ partners }: PartnerStripProps) {
  const items = [...partners, ...partners]; // duplicate for seamless scroll

  return (
    <section className="py-8 border-y border-slate-100 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-4 gap-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Trusted by leading hospitals
          </h2>
          <p className="hidden md:block text-xs text-slate-400">
            Selected partners we currently serve
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-10 animate-partner-marquee will-change-transform">
          {items.map((partner, idx) => (
            <div
              key={`${partner.slug}-${idx}`}
              className="flex items-center justify-center min-w-[140px] md:min-w-[190px] h-16 px-4"
            >
              <div className="relative h-10 md:h-12 w-auto max-w-[150px] md:max-w-[200px] grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={200}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

