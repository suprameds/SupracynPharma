import { trustSignals } from "@/data/trust-signals";
import { ShieldCheck, Globe, Factory, Award, Building2 } from "lucide-react";

// Helper to map string icon names to actual Lucide components
const IconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Globe,
  Factory,
  Award,
  Building2,
};

export function TrustSignalsStrip() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-2">
            Uncompromising Excellence
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-slate-800">
            A Foundation built on Quality and Trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {trustSignals.map((signal) => {
            const Icon = IconMap[signal.iconName] || ShieldCheck;
            return (
              <div 
                key={signal.id} 
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {signal.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {signal.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
