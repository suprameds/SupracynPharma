"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FlaskConical, HeartPulse, Factory, CalendarCheck } from "lucide-react";

export interface AnimatedStatsProps {
  productCount?: number;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
}

function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
      className="group flex flex-col items-center text-center space-y-2 py-10 px-4 relative"
    >
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-12 rounded-full ${stat.color.replace("text-", "bg-")}`} />

      <div className={`mb-2 ${stat.color} bg-white rounded-xl p-2.5 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 mx-auto" strokeWidth={1.5} />
      </div>
      <div className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
        {count}
        <span className={stat.color}>{stat.suffix}</span>
      </div>
      <div className="text-base font-bold text-slate-800">{stat.label}</div>
      <div className="text-sm text-slate-400 font-medium">{stat.sublabel}</div>
    </div>
  );
}

export function AnimatedStats({ productCount = 622 }: AnimatedStatsProps) {
  const STATS: StatItem[] = [
    {
      value: productCount,
      suffix: "+",
      label: "Formulations",
      sublabel: "Supracyn-branded",
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

  return (
    <section
      className="relative border-b border-slate-100 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0fdf4 100%)" }}
      aria-label="Key statistics"
    >
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
