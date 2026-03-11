import { PageHeader } from "@/components/blocks/page-header";
import { InsightsList } from "@/components/blocks/insights-list";

export const metadata = {
  title: "Insights & Updates | Supracyn Pharma",
  description:
    "Stay updated with Supracyn Pharma's corporate announcements, manufacturing insights, and healthcare industry perspectives.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader
        title="Insights & Corporate Updates"
        subtitle="Industry perspectives, manufacturing excellence highlights, and our latest corporate announcements."
        breadcrumbs={[{ label: "Insights" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <InsightsList />
        </div>
      </section>
    </div>
  );
}
