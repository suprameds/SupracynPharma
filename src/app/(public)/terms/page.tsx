import { PageHeader } from "@/components/blocks/page-header";

export const metadata = {
  title: "Terms of Use | Supracyn Pharma",
  description: "Terms and conditions governing the use of the Supracyn Pharma website.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using this website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use this website.`,
  },
  {
    title: "2. Use of the Website",
    body: `This website is provided for informational and business-inquiry purposes only. You may use the website for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the website. You must not misuse this website by knowingly introducing viruses, trojans, or other malicious material.`,
  },
  {
    title: "3. Intellectual Property",
    body: `All content on this website — including text, graphics, logos, images, and software — is the property of Supracyn Pharma or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this site without our express written permission.`,
  },
  {
    title: "4. No Medical Advice",
    body: `The information on this website is intended for general business and informational purposes only. Nothing on this website constitutes medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making any medical decisions.`,
  },
  {
    title: "5. Links to Third-Party Sites",
    body: `This website may contain links to external websites, including Suprameds.in. These links are provided for your convenience. Supracyn Pharma does not endorse and is not responsible for the content, privacy policies, or practices of any third-party websites.`,
  },
  {
    title: "6. Limitation of Liability",
    body: `To the fullest extent permitted by law, Supracyn Pharma shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of (or inability to use) this website or its content.`,
  },
  {
    title: "7. Changes to These Terms",
    body: `We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the revised terms.`,
  },
  {
    title: "8. Governing Law",
    body: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.`,
  },
  {
    title: "9. Contact",
    body: `For questions about these Terms, contact us at info@supracynpharma.com.`,
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Terms of Use"
        subtitle="Effective date: 1 January 2025"
        breadcrumbs={[{ label: "Terms of Use" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            Please read these Terms of Use carefully before using the Supracyn Pharma website. These terms govern your access to and use of our website and all content available through it.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
