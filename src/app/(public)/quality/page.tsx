import { PageHeader } from "@/components/blocks/page-header";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";
import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality & Compliance | Supracyn Pharma",
  description:
    "Supracyn Pharma markets products sourced exclusively from WHO-GMP certified manufacturers. Learn about our quality commitment and manufacturing partners.",
  openGraph: {
    title: "Quality & Compliance | Supracyn Pharma",
    description:
      "Supracyn Pharma markets products sourced exclusively from WHO-GMP certified manufacturers. Learn about our quality commitment and manufacturing partners.",
    url: "https://supracynpharma.com/quality",
  },
};

const PARTNERS = [
  {
    name: "Betamax Remedies Pvt Ltd",
    location: "Dist. Tahilwal, Himachal Pradesh",
    website: "https://betamaxremedies.com",
    certifications: ["WHO-GMP", "WHO-GLP", "QRO Certified", "UKAF Approved"],
    description:
      "A leading pharma manufacturer in HP with WHO-GMP, WHO-GLP, QRO, and UKAF certifications. Produces solid dosage and other formulations for the Supracyn portfolio.",
  },
  {
    name: "Theon Pharmaceuticals Ltd",
    location: "Dist. Solan, Himachal Pradesh",
    website: "https://www.theonpharma.com",
    certifications: ["WHO Certified", "ISO Certified", "NABL Accredited"],
    description:
      "An established HP-based pharmaceutical manufacturer with WHO, ISO, and NABL accreditation. Contributes multiple therapy segments to the Supracyn product range.",
  },
  {
    name: "Health Biotech Ltd",
    location: "Himachal Pradesh",
    website: "https://www.healthbiotech.in",
    certifications: ["GMP Certified"],
    description:
      "A certified pharmaceutical company specialising in nutraceuticals, vitamins, and health supplements that form part of the Supracyn nutritional range.",
  },
  {
    name: "Akums Drugs & Pharmaceuticals Ltd",
    location: "Haridwar, Uttarakhand",
    website: "https://www.akums.in",
    certifications: ["WHO-GMP", "ISO Certified", "US FDA Inspected"],
    description:
      "One of India's largest contract pharmaceutical manufacturers with a wide dosage form capability, supplying high-volume formulations for the Supracyn brand.",
  },
];

export default function QualityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Quality & Compliance"
        subtitle="Every Supracyn-branded product is sourced from WHO-GMP certified manufacturers and undergoes rigorous quality oversight before reaching the market."
        breadcrumbs={[{ label: "Quality" }]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Quality Promise
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Supracyn Pharma does not compromise on quality. We market only those products that are manufactured by verified, certified partners under strict pharmaceutical standards. Every product bearing the Supracyn name has been sourced, tested, and approved before distribution.
            </p>
          </div>

          {/* Quality process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { step: "01", title: "Partner Verification", desc: "We evaluate each manufacturing partner's facility certifications, audit reports, and regulatory standing before onboarding them." },
              { step: "02", title: "Product Testing", desc: "All Supracyn formulations undergo independent analytical testing for purity, potency, and stability before entering distribution." },
              { step: "03", title: "Ongoing Oversight", desc: "We conduct periodic quality audits of our manufacturing partners and monitor each batch for compliance with label claims." },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" aria-hidden="true" />
                <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-primary text-sm mx-auto mb-6 border border-primary/20">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Manufacturing Partners */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
              Our Manufacturing Partners
            </h2>
            <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
              Supracyn products are manufactured under third-party licences at the following WHO-certified facilities. These companies are audited regularly and hold independent quality certifications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{partner.location}</p>
                    </div>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${partner.name} website`}
                      className="flex-shrink-0 h-8 w-8 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {partner.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {partner.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full"
                      >
                        <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment note */}
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Quality You Can Trust — Every Time
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              All Supracyn products are manufactured under strict Good Manufacturing Practice (GMP) guidelines and under the supervision of qualified pharmaceutical professionals. Our medicines are produced under third-party licences, ensuring regulatory compliance in all markets we serve.
            </p>
          </div>

        </div>
      </section>

      <TrustSignalsStrip />

    </div>
  );
}
