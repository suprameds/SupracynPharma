import { PageHeader } from "@/components/blocks/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Factory, Truck, Microscope, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Manufacturing & Infrastructure | Supracyn Pharma",
  description: "Explore Supracyn Pharma's robust manufacturing capabilities, state-of-the-art facilities, and supply chain excellence.",
};

export default function InfrastructurePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Manufacturing & Infrastructure" 
        subtitle="Scalable, compliant, and technology-driven facilities built to power global healthcare."
        breadcrumbs={[
          { label: "Infrastructure" }
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">State-of-the-Art Production Hubs</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our manufacturing plants are designed in accordance with current Good Manufacturing Practices (cGMP). Segregated blocks ensure precise atmospheric control, eliminating cross-contamination risks across varied therapeutic formulations.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-4xl text-primary mb-1">1B+</h4>
                  <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Tablets / Annum</span>
                </div>
                <div>
                  <h4 className="font-bold text-4xl text-accent mb-1">5L+</h4>
                  <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Syrups / Month</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 aspect-[4/5] rounded-2xl flex items-center justify-center p-6 border text-center">
                <span className="text-slate-400 font-medium text-sm">Solid Dosage Line Image</span>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-slate-100 aspect-square rounded-2xl flex items-center justify-center p-6 border text-center">
                  <span className="text-slate-400 font-medium text-sm">Liquid Line Image</span>
                </div>
                <div className="bg-primary/5 aspect-square rounded-2xl flex items-center justify-center p-6 border border-primary/10 text-center">
                  <span className="text-primary/60 font-medium text-sm">Packaging Area</span>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-12">Our Core Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Factory, title: "Solid Orals", desc: "Tablets, capsules, and extended-release formulations manufactured with high-speed compression and coating lines." },
              { icon: ShieldCheck, title: "Liquid Orals", desc: "Syrups and suspensions with rigorous homogenization and zero-defects filling protocols." },
              { icon: Microscope, title: "Advanced R&D", desc: "Dedicated laboratory setup for formulation development, stability studies, and API validation." },
              { icon: Truck, title: "Logistics Hub", desc: "Temperature-controlled warehousing ensuring product stability during storage and transit." }
            ].map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group">
                  <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">{cap.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Utilize Our Infrastructure for Your Brand</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Supracyn Pharma offers highly scalable Third-Party Manufacturing and Private Labeling services. Partner with us to bring your formulations to market efficiently.
          </p>
          <Link href="/partnerships#manufacturing">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none h-14 px-8 text-lg">
              Inquire About Manufacturing
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
