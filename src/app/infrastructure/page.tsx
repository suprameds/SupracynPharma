import { PageHeader } from "@/components/blocks/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Factory, Microscope, ShieldCheck, Truck, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Network | Supracyn Pharma",
  description:
    "Supracyn Pharma sources its branded formulations from a network of WHO-GMP certified pharmaceutical manufacturers across India.",
  openGraph: {
    title: "Manufacturing Network | Supracyn Pharma",
    description:
      "Supracyn Pharma sources its branded formulations from a network of WHO-GMP certified pharmaceutical manufacturers across India.",
    url: "https://supracynpharma.com/infrastructure",
  },
};

export default function InfrastructurePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Manufacturing Network"
        subtitle="Supracyn products are backed by a vetted network of WHO-GMP certified manufacturing facilities spread across India."
        breadcrumbs={[{ label: "Manufacturing Network" }]}
      />

      <section id="manufacturing" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Third-Party Licensed Manufacturing
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Supracyn Pharma markets its branded medicines through a carefully selected network of certified third-party manufacturers. Each facility is WHO-GMP compliant, regularly audited, and staffed by qualified pharmaceutical professionals — ensuring every Supracyn product meets the highest standards of purity, potency, and safety.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our manufacturing partners are based in leading pharma manufacturing hubs of India — including Himachal Pradesh, Uttarakhand, and Telangana — giving us access to diverse dosage form capabilities across solid orals, liquids, and nutritional supplements.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-4xl text-primary mb-1">4+</h4>
                  <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Certified Partner Facilities</span>
                </div>
                <div>
                  <h4 className="font-bold text-4xl text-accent mb-1">500+</h4>
                  <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Branded Formulations</span>
                </div>
              </div>
            </div>

            {/* Map-style location cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Betamax Remedies", location: "Tahilwal, Himachal Pradesh", cert: "WHO-GMP, WHO-GLP" },
                { name: "Theon Pharmaceuticals", location: "Solan, Himachal Pradesh", cert: "WHO, ISO, NABL" },
                { name: "Health Biotech", location: "Himachal Pradesh", cert: "GMP Certified" },
                { name: "Akums Drugs", location: "Haridwar, Uttarakhand", cert: "WHO-GMP, ISO" },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col gap-2 hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">{partner.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{partner.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full self-start">
                    {partner.cert}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div id="research" className="scroll-mt-20">
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-12">
              What Our Partners Manufacture for Supracyn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Factory, title: "Solid Orals", desc: "Tablets and capsules across anti-infectives, cardiac, diabetology, and pain management therapy areas." },
                { icon: ShieldCheck, title: "Liquid Orals", desc: "Syrups and suspensions, including paediatric formulations and vitamin/nutrition supplements." },
                { icon: Microscope, title: "Nutraceuticals", desc: "Vitamins, mineral supplements, and health nutrition products under the Supracyn brand." },
                { icon: Truck, title: "Gynaecology Range", desc: "Hormonal and reproductive health formulations manufactured to specialist pharma standards." },
              ].map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group">
                    <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">{cap.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Interested in Distributing Supracyn?</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Our branded portfolio is manufactured to the highest standards and ready for distribution across India and international markets. Contact us to explore partnership opportunities.
          </p>
          <Link href="/partnerships">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none h-14 px-8 text-lg">
              Become a Distribution Partner
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
