import { PageHeader } from "@/components/blocks/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Careers | Supracyn Pharma",
  description: "Explore career opportunities at Supracyn Pharma and join our team of pharmaceutical professionals.",
};

type Opening = {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract";
};

const openings: Opening[] = [
  {
    title: "Quality Assurance Executive",
    department: "Quality & Regulatory",
    location: "Navi Mumbai, MH",
    type: "Full-time",
  },
  {
    title: "Production Pharmacist",
    department: "Manufacturing",
    location: "Navi Mumbai, MH",
    type: "Full-time",
  },
  {
    title: "Business Development Manager — Export",
    department: "Sales & Business Development",
    location: "Mumbai, MH",
    type: "Full-time",
  },
  {
    title: "Regulatory Affairs Specialist",
    department: "Quality & Regulatory",
    location: "Navi Mumbai, MH",
    type: "Full-time",
  },
  {
    title: "Medical Representative",
    department: "Sales & Business Development",
    location: "Pan India",
    type: "Full-time",
  },
];

const values = [
  {
    title: "Growth-Oriented Culture",
    desc: "We invest in continuous learning, certifications, and internal mobility so you can grow with us.",
  },
  {
    title: "Meaningful Work",
    desc: "Every role at Supracyn contributes directly to improving patient outcomes and global healthcare access.",
  },
  {
    title: "Collaborative Teams",
    desc: "Cross-functional teams with open communication and a flat enough structure for your ideas to be heard.",
  },
  {
    title: "Global Exposure",
    desc: "With exports to 25+ countries, you get broad exposure to international regulatory and market standards.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Join Our Team"
        subtitle="Build a career that makes a difference in global healthcare."
        breadcrumbs={[{ label: "Careers" }]}
      />

      {/* Why join us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Why Supracyn Pharma?</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            We are a WHO-GMP certified manufacturer with a growing international footprint. If you are passionate about pharmaceutical excellence, we want to hear from you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Current Openings</h2>
          <p className="text-slate-600 mb-10">
            Interested in a role? Send your CV and cover letter to{" "}
            <a href="mailto:careers@supracynpharma.com" className="text-primary hover:underline font-medium">
              careers@supracynpharma.com
            </a>{" "}
            with the job title in the subject line.
          </p>

          <div className="space-y-4">
            {openings.map((role) => (
              <div
                key={role.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {role.location}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {role.type}
                    </Badge>
                  </div>
                </div>
                <a
                  href={`mailto:careers@supracynpharma.com?subject=Application: ${encodeURIComponent(role.title)}`}
                  className="flex-shrink-0"
                >
                  <Button variant="outline" size="sm" className="group">
                    Apply Now
                    <ArrowRight className="ml-2 h-3.5 w-3.5 text-slate-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Don&rsquo;t see a matching role?</h2>
          <p className="text-slate-600 mb-6">
            We are always open to talented professionals. Send us your profile and let us know how you can contribute.
          </p>
          <Link href="/contact">
            <Button size="lg">Get In Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
