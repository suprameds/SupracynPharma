import { PageHeader } from "@/components/blocks/page-header";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Supracyn Pharma",
  description:
    "Learn about Supracyn Pharma — the company behind the Supracyn brand of trusted, quality-assured pharmaceutical products marketed across 25+ countries.",
  openGraph: {
    title: "About Us | Supracyn Pharma",
    description:
      "Learn about Supracyn Pharma — the company behind the Supracyn brand of trusted, quality-assured pharmaceutical products marketed across 25+ countries.",
    url: "https://supracynpharma.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="About Supracyn Pharma"
        subtitle="The company behind the Supracyn brand — bringing quality, branded medicines to patients and healthcare providers across the world."
        breadcrumbs={[{ label: "About Us" }]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Heritage</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Founded with a vision to make quality healthcare accessible, Supracyn Pharma has grown into a trusted pharmaceutical brand marketed across India and global markets. We build the Supracyn name on a simple promise — every product that carries our brand is safe, effective, and affordably priced.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-600">
                    To market safe, effective, and affordable branded pharmaceutical products that healthcare professionals trust and patients rely on — across India and internationally.
                  </p>
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-xl font-bold text-primary mb-2">Our Vision</h3>
                  <p className="text-slate-700">
                    To establish Supracyn as the go-to pharmaceutical brand in every market we enter — recognised for consistent quality, wide therapeutic coverage, and accessible pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Core Values</h2>
                <ul className="space-y-6">
                  {[
                    { title: "Quality First", desc: "Every Supracyn-branded product meets international safety and efficacy standards — no compromise." },
                    { title: "Integrity", desc: "Honest pricing, transparent sourcing, and ethical marketing guide everything we do." },
                    { title: "Accessibility", desc: "We believe quality medicines should be affordable and available in every market we serve." },
                    { title: "Partnership", desc: "We grow by building long-term, trust-based relationships with distributors, doctors, and institutions." }
                  ].map((value, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center flex-shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{value.title}</h4>
                        <p className="text-slate-600">{value.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-14">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 md:left-1/2" aria-hidden="true" />
            <ol className="space-y-10">
              {[
                { year: "2001", title: "Brand Founded", desc: "Supracyn Pharma was established in New Delhi with a clear purpose — to build a pharmaceutical brand that doctors and patients could trust." },
                { year: "2005", title: "First Product Range", desc: "Launched our first portfolio of Supracyn-branded formulations across anti-infectives and gastroenterology, gaining rapid traction with healthcare professionals." },
                { year: "2010", title: "Pan-India Presence", desc: "Supracyn products reached pharmacies and hospitals across all major Indian states, establishing a strong national footprint." },
                { year: "2014", title: "International Markets", desc: "Began marketing Supracyn-branded products in African and Middle Eastern markets, reaching 10+ countries." },
                { year: "2019", title: "Portfolio Expansion", desc: "Expanded the Supracyn portfolio to 500+ branded formulations spanning 6 therapy areas including cardiology, neurology, and respiratory." },
                { year: "2024", title: "25+ Countries", desc: "Supracyn is now a recognised pharmaceutical brand across 25+ markets, trusted by thousands of doctors and dispensed at hundreds of thousands of pharmacies." },
              ].map((item, i) => (
                <li key={item.year} className={`relative flex gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:w-1/2 ${i % 2 === 0 ? "md:ml-0 md:pr-12" : "md:ml-auto md:pl-12"}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-md z-10">
                    {item.year.slice(2)}
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex-1">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.year}</div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Leadership</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { role: "Managing Director", initials: "MD", bio: "Leading Supracyn Pharma's strategic vision and global expansion since founding." },
              { role: "Chief Operating Officer", initials: "CO", bio: "Overseeing manufacturing excellence, supply chain, and operational efficiency." },
              { role: "Head of Quality Assurance", initials: "QA", bio: "Ensuring WHO-GMP compliance and zero-compromise quality across all product lines." },
            ].map((person) => (
              <div key={person.role} className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm">
                {/* Replace the initials div with a real <Image> once photos are available */}
                <div
                  className="w-20 h-20 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  {person.initials}
                </div>
                <div className="text-base font-bold text-slate-900">{person.role}</div>
                <div className="text-sm text-slate-500 mt-1">{person.bio}</div>
              </div>
            ))}
          </div>

          <blockquote className="mt-16 text-center">
            <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-6">
              &ldquo;The Supracyn name on a product is a promise — a promise that every patient can trust what they are taking, and every doctor can confidently prescribe it.&rdquo;
            </p>
            <footer className="text-slate-500 text-sm">— Managing Director, Supracyn Pharma</footer>
          </blockquote>
        </div>
      </section>

      <TrustSignalsStrip />
      
    </div>
  );
}
