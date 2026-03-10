import { PageHeader } from "@/components/blocks/page-header";
import { TrustSignalsStrip } from "@/components/blocks/trust-signals";

export const metadata = {
  title: "Quality & Compliance | Supracyn Pharma",
  description: "Supracyn Pharma's unwavering commitment to quality assurance, regulatory compliance, and WHO-GMP manufacturing standards.",
};

export default function QualityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Quality & Compliance" 
        subtitle="Uncompromising standards driving our manufacturing ethos, ensuring safety and efficacy in every formulation."
        breadcrumbs={[
          { label: "Quality" }
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Quality is Not an Act, It Is a Habit</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Supracyn Pharma, Quality Assurance (QA) and Quality Control (QC) are the fundamental tenets of our operations. From raw material sourcing to final dispatch, every step is rigorously monitored to meet global compliance criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {['Raw Material Testing', 'In-Process Controls', 'Final Batch Release'].map((step, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-primary mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step}</h3>
                <p className="text-sm text-slate-600">
                  Comprehensive analytical testing and strict parameter monitoring to ensure zero-defect output at this critical stage.
                </p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Certifications & Approvals</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Our facilities are periodically audited by leading domestic and international regulatory authorities. We maintain strict adherence to Good Manufacturing Practices (GMP) and Good Laboratory Practices (GLP).
                </p>
                <div className="flex flex-col space-y-4">
                  {['WHO-GMP Compliant Facilities', 'ISO 9001:2015 Certified', 'State FDA Approved', 'Multiple International Dossier Readouts'].map((cert, j) => (
                    <div key={j} className="flex items-center text-slate-800 font-medium">
                      <div className="mr-4 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-4">
                  <span className="text-slate-400 font-medium text-sm text-center">Certificate Placeholder</span>
                </div>
                <div className="aspect-square bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-4">
                  <span className="text-slate-400 font-medium text-sm text-center">Certificate Placeholder</span>
                </div>
                <div className="col-span-2 aspect-[3/1] bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-4">
                  <span className="text-slate-400 font-medium text-sm text-center">Laboratory Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <TrustSignalsStrip />
      
    </div>
  );
}
