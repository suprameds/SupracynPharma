import { PageHeader } from "@/components/blocks/page-header";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Supracyn Pharma",
  description:
    "Learn about Supracyn Pharma's mission, vision, and our commitment to manufacturing excellence in the healthcare industry.",
  openGraph: {
    title: "About Us | Supracyn Pharma",
    description:
      "Learn about Supracyn Pharma's mission, vision, and our commitment to manufacturing excellence in the healthcare industry.",
    url: "https://supracynpharma.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="About Supracyn Pharma" 
        subtitle="A heritage of quality, consistency, and global healthcare impact."
        breadcrumbs={[
          { label: "About Us" }
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Heritage</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Founded with a vision to make high-quality healthcare accessible, Supracyn Pharma has grown into a trusted name in the pharmaceutical manufacturing sector. We specialize in producing a wide array of therapeutic formulations that meet the most stringent global standards.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-600">
                    To manufacture and deliver safe, effective, and affordable pharmaceutical products globally, driven by innovation, rigorous quality control, and ethical business practices.
                  </p>
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-xl font-bold text-primary mb-2">Our Vision</h3>
                  <p className="text-slate-700">
                    To be the partner of choice in global healthcare by setting uncompromising benchmarks in pharmaceutical manufacturing and delivering value to our stakeholders.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Core Values</h2>
                <ul className="space-y-6">
                  {[
                    { title: "Quality First", desc: "We never compromise on the safety and efficacy of our products." },
                    { title: "Integrity", desc: "Honesty and transparency guide all our business operations." },
                    { title: "Innovation", desc: "Continuous improvement in our manufacturing processes." },
                    { title: "Partnership", desc: "Building long-term, mutually beneficial relationships." }
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
                { year: "2001", title: "Foundation", desc: "Supracyn Pharma was established in New Delhi with a mission to manufacture affordable, high-quality generics for domestic healthcare." },
                { year: "2006", title: "WHO-GMP Certification", desc: "Achieved WHO-GMP certification, marking our entry into the global pharmaceutical export market." },
                { year: "2011", title: "International Expansion", desc: "Commenced exports to African and Middle Eastern markets, reaching 10+ countries." },
                { year: "2016", title: "Infrastructure Scale-up", desc: "Expanded manufacturing capacity to over 1 billion tablets per annum with a new automated production line." },
                { year: "2021", title: "R&D Investment", desc: "Launched dedicated R&D centre for novel formulation development and stability studies." },
                { year: "2024", title: "25+ Countries", desc: "Now exporting to over 25 countries with 500+ approved formulations across 6 therapy areas." },
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
              &ldquo;Our commitment to quality is not just a regulatory requirement; it is a moral obligation to the patients who rely on our formulations every day.&rdquo;
            </p>
            <footer className="text-slate-500 text-sm">— Managing Director, Supracyn Pharma</footer>
          </blockquote>
        </div>
      </section>

      <TrustSignalsStrip />
      
    </div>
  );
}
