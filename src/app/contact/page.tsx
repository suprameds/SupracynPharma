import { PageHeader } from "@/components/blocks/page-header";
import { InquiryForm } from "@/components/blocks/inquiry-form";
import { MapPin, Phone, Mail, Building } from "lucide-react";

export const metadata = {
  title: "Contact Us | Supracyn Pharma",
  description:
    "Get in touch with Supracyn Pharma, Hyderabad — for product inquiries, distribution partnerships, or general information.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader
        title="Contact Us"
        subtitle="We welcome inquiries from prospective distribution partners, healthcare professionals, and institutions across India."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Office</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Building className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Registered Address</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Supracyn Pharma,<br />
                        Sanath Nagar,<br />
                        Hyderabad, Telangana — 500018
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Phone</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Please reach out via email or the contact form and we will call you back.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Email</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        General Inquiries:{" "}
                        <a href="mailto:info@supracynpharma.com" className="text-primary hover:underline">
                          info@supracynpharma.com
                        </a>
                        <br />
                        Partnerships:{" "}
                        <a href="mailto:partners@supracynpharma.com" className="text-primary hover:underline">
                          partners@supracynpharma.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Location</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Sanath Nagar is a prominent commercial and industrial locality in western Hyderabad, well-connected to the city&apos;s pharma hubs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border shadow-lg border-slate-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
                <p className="text-slate-500 mt-2">
                  Our team responds to all inquiries within 24–48 business hours.
                </p>
              </div>
              <InquiryForm type="general" />
            </div>

          </div>
        </div>
      </section>

      {/* Location map — Sanath Nagar, Hyderabad */}
      <section className="relative border-t border-slate-200" aria-label="Office location map">
        <iframe
          title="Supracyn Pharma, Sanath Nagar, Hyderabad"
          src="https://www.openstreetmap.org/export/embed.html?bbox=78.4200%2C17.4200%2C78.4800%2C17.4700&layer=mapnik&marker=17.4455%2C78.4510"
          className="w-full h-80 md:h-96"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 right-4">
          <a
            href="https://www.openstreetmap.org/?mlat=17.4455&mlon=78.4510#map=15/17.4455/78.4510"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700 hover:text-primary px-3 py-1.5 rounded-full transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            View larger map
          </a>
        </div>
      </section>

    </div>
  );
}
