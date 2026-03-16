import { trustSignals } from "@/data/trust-signals";
import { ShieldCheck, MapPin, Factory, Award, Building2 } from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  MapPin,
  Factory,
  Award,
  Building2,
};

const CARD_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-purple-500 to-pink-600",
];

export function TrustSignalsStrip() {
  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden border-y border-slate-100"
      style={{
        background:
          "linear-gradient(135deg, #eff6ff 0%, #f8fafc 40%, #f0fdf4 100%)",
      }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Uncompromising Excellence
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            A Foundation Built on Quality &amp; Trust
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Every Supracyn product is backed by verifiable certifications,
            tested sourcing, and India-wide reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((signal, idx) => {
            const Icon = IconMap[signal.iconName] || ShieldCheck;
            const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
            return (
              <div
                key={signal.id}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-7 flex flex-col items-center text-center space-y-4 overflow-hidden"
              >
                {/* Gradient hover glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                  aria-hidden="true"
                />

                {/* Icon with gradient background */}
                <div
                  className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                  {/* Inner shine */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
                    }}
                  />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {signal.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
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
