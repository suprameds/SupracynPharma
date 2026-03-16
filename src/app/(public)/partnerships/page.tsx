import { PageHeader } from "@/components/blocks/page-header";
import { InquiryForm } from "@/components/blocks/inquiry-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Partnerships | Supracyn Pharma",
  description:
    "Become a Supracyn distribution partner. We are looking for distributors, pharmacies, and hospital networks to carry our branded pharmaceutical portfolio.",
  openGraph: {
    title: "Distribution Partnerships | Supracyn Pharma",
    description:
      "Become a Supracyn distribution partner. We are looking for distributors, pharmacies, and hospital networks to carry our branded pharmaceutical portfolio.",
    url: "https://supracynpharma.com/partnerships",
  },
};

export default function PartnershipsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title="Distribution Partnerships"
        subtitle="Carry the Supracyn brand in your market. We partner with distributors, pharmacy chains, and healthcare institutions who want to offer quality, trusted medicines."
        breadcrumbs={[{ label: "Partnerships" }]}
      />

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Partner With</h2>
                <div className="space-y-6">
                  {[
                    { title: "Regional Distributors", desc: "Carry the full Supracyn portfolio in your territory with priority stock allocation and marketing support." },
                    { title: "Pharmacy Chains & Retail Networks", desc: "Stock fast-moving Supracyn-branded medicines with competitive margins and reliable replenishment." },
                    { title: "Hospitals & Institutional Buyers", desc: "Procure Supracyn formulations at scale for formulary inclusion, with dedicated account management." },
                    { title: "International Import Partners", desc: "Represent the Supracyn brand in your country with exclusive territory rights and full regulatory documentation support." },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-primary/20 transition-colors">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
                <ol className="space-y-6">
                  {[
                    { step: "01", title: "Submit Inquiry", desc: "Fill out the partnership form with your requirements. We respond within 24 hours." },
                    { step: "02", title: "Discovery Call", desc: "Our business development team schedules a call to understand your exact needs." },
                    { step: "03", title: "Proposal & NDA", desc: "We send a tailored commercial proposal. All discussions are protected under NDA." },
                    { step: "04", title: "Begin Distribution", desc: "Sign the agreement, receive first stock allocation, and begin selling Supracyn products in your market." },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center border border-primary/20">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-primary text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full" />
                <h3 className="text-xl font-bold mb-4 relative z-10">Interested in exclusive territory rights?</h3>
                <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed relative z-10">
                  We offer exclusive Supracyn distribution rights in select geographies. Talk to our business development team to check availability for your market.
                </p>
                <div className="text-lg font-bold relative z-10">+91 (0) 11-2345-6789</div>
                <div className="text-sm text-primary-foreground/60 relative z-10">partners@supracyn.com</div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border shadow-xl shadow-slate-200/50">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Become a Supracyn Partner</h2>
                <p className="text-slate-500 mt-2">Share your details and our business development team will reach out within 24 hours to discuss how we can grow together.</p>
              </div>
              <InquiryForm type="partnership" />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
