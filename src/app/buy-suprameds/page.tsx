import { PageHeader } from "@/components/blocks/page-header";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Direct Purchase Online | Supracyn Pharma",
  description: "Information regarding direct-to-consumer online purchases of Supracyn Pharma products via our verified partner platform, Suprameds.in.",
};

export default function BuySupramedsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader 
        title="Direct Online Access" 
        subtitle="Bridging manufacturing excellence with direct consumer access through our dedicated eCommerce wing."
        breadcrumbs={[
          { label: "Purchase Online" }
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs tracking-widest uppercase mb-4">
                  Important Distinction
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-4">
                  Supracyn Pharma vs. Suprameds.in
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  <strong className="text-slate-900">Supracyn Pharma</strong> is our corporate manufacturing entity, focused on B2B partnerships, institutional supply, and maintaining rigorous WHO-GMP production standards.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                   To serve individual customers effectively, we operate <strong className="text-slate-900">Suprameds.in</strong>, a separate, specialized eCommerce ecosystem designed for safe, direct-to-doorstep medicine delivery.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Why buy from Suprameds?</h3>
                <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, title: "100% Genuine", desc: "Sourced directly from our manufacturing facilities." },
                    { icon: ShoppingBag, title: "Seamless Ordering", desc: "User-friendly interface optimized for pharmacies and consumers." },
                    { icon: Truck, title: "Secure Logistics", desc: "Temperature-monitored direct delivery network." }
                  ].map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <li key={i} className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{feature.title}</h4>
                          <p className="text-sm text-slate-600">{feature.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-3xl -z-10 transform rotate-3 scale-105" />
              <div className="bg-slate-900 text-white p-10 md:p-14 rounded-3xl shadow-2xl relative z-10 text-center">
                <div className="h-20 w-20 bg-white/10 rounded-2xl mx-auto mb-8 flex items-center justify-center border border-white/20">
                  <ShoppingBag className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to Order?</h3>
                <p className="text-slate-300 mb-10 text-lg leading-relaxed max-w-xs mx-auto">
                  You are now leaving the corporate portal and entering our verified online pharmacy.
                </p>
                <a href="https://suprameds.in" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button size="lg" className="w-full h-14 text-lg bg-white text-slate-900 hover:bg-slate-100 border-none transition-all hover:scale-105">
                    Continue to Suprameds.in
                  </Button>
                </a>
                <p className="text-xs text-slate-500 mt-6 mt-6">Secure window. SSL Encrypted Connection.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
