import { PageHeader } from "@/components/blocks/page-header";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";

export const metadata = {
  title: "About Us | Supracyn Pharma",
  description: "Learn about Supracyn Pharma's mission, vision, and our commitment to manufacturing excellence in the healthcare industry.",
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

      {/* Leadership Note Placeholder */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
            <span className="text-sm text-slate-400">Photo</span>
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-8">
            &quot;Our commitment to quality is not just a regulatory requirement; it is a moral obligation to the patients who rely on our formulations every day.&quot;
          </blockquote>
          <div className="text-lg font-bold text-slate-900">Leadership Placeholder</div>
          <div className="text-slate-500">Managing Director, Supracyn Pharma</div>
        </div>
      </section>

      <TrustSignalsStrip />
      
    </div>
  );
}
