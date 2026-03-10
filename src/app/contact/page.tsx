import { PageHeader } from "@/components/blocks/page-header";
import { InquiryForm } from "@/components/blocks/inquiry-form";
import { MapPin, Phone, Mail, Building } from "lucide-react";

export const metadata = {
  title: "Contact Us | Supracyn Pharma",
  description: "Get in touch with Supracyn Pharma for corporate inquiries, partnerships, or general information.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader 
        title="Contact Us" 
        subtitle="We welcome inquiries from prospective partners, healthcare professionals, and institutions globally."
        breadcrumbs={[
          { label: "Contact Us" }
        ]}
      />

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Corporate Office</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Registered Address</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Supracyn House, Industrial Area Phase II,<br />
                        New Delhi, India - 110020
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Phone</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Main: +91 (0) 11-2345-6789<br />
                        Export Desk: +91 (0) 11-2345-6790
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Email</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Inquiries: info@supracyn.com<br />
                        Partnerships: partners@supracyn.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Manufacturing Facility</h2>
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 flex-shrink-0 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Plant Location</h4>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      Plot 45-50, Pharma City Block A,<br />
                      State Highway 2,<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border shadow-lg border-slate-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
                <p className="text-slate-500 mt-2">Our support team aims to respond to all corporate inquiries within 24-48 business hours.</p>
              </div>
              <InquiryForm type="general" />
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-slate-500 flex flex-col items-center">
            <MapPin className="h-12 w-12 mb-4 opacity-50" />
            <span className="font-bold tracking-widest uppercase text-sm">Interactive Map Placeholder</span>
          </div>
        </div>
      </section>

    </div>
  );
}
