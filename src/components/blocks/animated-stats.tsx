"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FlaskConical, HeartPulse, Factory, CalendarCheck } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
}

const STATS: StatItem[] = [
  {
    value: 500,
    suffix: "+",
    label: "Formulations",
    sublabel: "Branded & ready",
    icon: FlaskConical,
    color: "text-primary",
  },
  {
    value: 7,
    suffix: "",
    label: "Therapy Areas",
    sublabel: "Cardiology to Nutrition",
    icon: HeartPulse,
    color: "text-rose-600",
  },
  {
    value: 4,
    suffix: "",
    label: "GMP Partners",
    sublabel: "WHO & CDSCO certified",
    icon: Factory,
    color: "text-emerald-600",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Strong",
    sublabel: "Est. Hyderabad, 2014",
    icon: CalendarCheck,
    color: "text-amber-600",
  },
];

function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    setCount(0);
    const totalFrames = Math.round(duration / 16);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      // Ease-out curve: starts fast, slows at the end
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.min(Math.floor(progress * target), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(stat.value, 1400, inView);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center space-y-2 py-8 px-4"
    >
      <div className={`mb-3 ${stat.color}`}>
        <Icon className="h-8 w-8 mx-auto" strokeWidth={1.5} />
      </div>
      <div className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
        {count}
        <span className={stat.color}>{stat.suffix}</span>
      </div>
      <div className="text-lg font-bold text-slate-800">{stat.label}</div>
      <div className="text-sm text-slate-500 font-medium">{stat.sublabel}</div>
    </div>
  );
}

export function AnimatedStats() {
  return (
    <section className="bg-white border-b border-slate-100" aria-label="Key statistics">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
