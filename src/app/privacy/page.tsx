import { PageHeader } from "@/components/blocks/page-header";

export const metadata = {
  title: "Privacy Policy | Supracyn Pharma",
  description: "How Supracyn Pharma collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: `When you submit an inquiry through our website, we collect the personal information you provide — including your name, company name, email address, phone number, and the details of your message. We may also collect non-personal browsing data (page visits, browser type, referring URL) through standard web analytics tools.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information you provide solely to respond to your inquiry, to facilitate business correspondence, and to improve our services. We do not use your personal data for automated decision-making or profiling.`,
  },
  {
    title: "3. Sharing of Information",
    body: `We do not sell, rent, or trade your personal information to third parties. Information may be shared with service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential and use it only to provide services to us.`,
  },
  {
    title: "4. Data Retention",
    body: `We retain inquiry records for as long as necessary to fulfil the purpose for which they were collected, and as required by applicable law. You may request deletion of your data by contacting us at the address below.`,
  },
  {
    title: "5. Cookies",
    body: `Our website may use cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can choose to disable cookies in your browser settings; however, this may affect certain features of the site.`,
  },
  {
    title: "6. Security",
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Inquiry data is stored in a secure, access-controlled database.`,
  },
  {
    title: "7. Your Rights",
    body: `Depending on your jurisdiction, you may have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, please contact us at info@supracynpharma.com.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this page periodically.`,
  },
  {
    title: "9. Contact Us",
    body: `If you have any questions about this Privacy Policy or our data practices, please write to us at:\n\nSupracyn Pharma\ninfo@supracynpharma.com\n+91 22 4567 8900`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Privacy Policy"
        subtitle="Effective date: 1 January 2025"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            Supracyn Pharma (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy of visitors to our website. This policy describes what information we collect, how we use it, and your rights in relation to it.
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
