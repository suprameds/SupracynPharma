import { PageHeader } from "@/components/blocks/page-header";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Medical Disclaimer | Supracyn Pharma",
  description: "Important disclaimers regarding the pharmaceutical and medical information presented on the Supracyn Pharma website.",
};

const sections = [
  {
    title: "For Educational and Business Purposes Only",
    body: `All product information, dosage details, therapeutic indications, and clinical data presented on this website are intended solely for healthcare professionals, pharmaceutical distributors, and business partners. This information is provided for educational and trade reference purposes only.`,
  },
  {
    title: "Not a Substitute for Professional Medical Advice",
    body: `Nothing on this website should be construed as medical advice, diagnosis, or a recommendation for any specific treatment. Patients and consumers must not use the information on this website as a substitute for consultation with a qualified and registered medical practitioner.`,
  },
  {
    title: "Regulatory Compliance by Jurisdiction",
    body: `The products described on this website are marketed within India and are approved under applicable Indian regulations. Availability, indications, contraindications, and dosage recommendations are governed by the Drugs and Cosmetics Act, 1940 and CDSCO guidelines. Always refer to the locally approved prescribing information.`,
  },
  {
    title: "No Warranty on Accuracy",
    body: `While Supracyn Pharma endeavours to keep product and clinical information accurate and up to date, we make no representations or warranties — express or implied — about the completeness, accuracy, reliability, or suitability of information on this site. Any reliance you place on such information is strictly at your own risk.`,
  },
  {
    title: "Third-Party Links",
    body: `References or links to third-party websites (including Suprameds.in) are for informational convenience only. Supracyn Pharma does not endorse the accuracy or content of any third-party site and is not responsible for any loss or damage arising from your reliance on information accessed through such links.`,
  },
  {
    title: "Adverse Events",
    body: `If you are a healthcare professional and wish to report a suspected adverse event or product quality complaint, please contact us directly at medicalaffairs@supracynpharma.com or call +91 22 4567 8900. Adverse events may also be reported to your national pharmacovigilance authority.`,
  },
];

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Medical Disclaimer"
        subtitle="Important information about the use of content on this website."
        breadcrumbs={[{ label: "Disclaimer" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">

          {/* Prominent notice banner */}
          <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Important:</strong> The content on this website is intended for healthcare professionals and business partners only. It does not constitute medical advice and must not be used for self-diagnosis or self-treatment. Always seek guidance from a qualified healthcare provider.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100 text-sm text-slate-400">
            Last reviewed: January 2025. Supracyn Pharma reserves the right to update this disclaimer at any time without prior notice.
          </div>
        </div>
      </section>
    </div>
  );
}
