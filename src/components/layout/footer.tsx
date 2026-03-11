import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-900 text-slate-300">

      {/* Top CTA band */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-8 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                Ready to partner with us?
              </h2>
              <p className="text-slate-400 text-sm max-w-md">
                Distributors, hospital networks, and private-label partners — reach out and our team will respond within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/partnerships">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-md shadow-primary/20">
                  Start a Partnership
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Supracyn Pharma home">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary/90 transition-colors">
                <Stethoscope className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">Supracyn Pharma</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A WHO-GMP certified pharmaceutical manufacturer delivering safe, effective, and affordable formulations to 25+ countries.
            </p>
            <div className="text-sm text-slate-400 space-y-1 pt-2">
              <p className="font-medium text-slate-300">Corporate Office</p>
              <p>Supracyn House, Industrial Area,</p>
              <p>New Delhi, India &mdash; 110020</p>
              <a href="mailto:info@supracynpharma.com" className="block mt-2 text-primary hover:text-primary/80 transition-colors font-medium">
                info@supracynpharma.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {[
            { heading: "Company", links: footerNavigation.company },
            { heading: "Products & Quality", links: footerNavigation.products },
            { heading: "Partnerships", links: footerNavigation.partnerships },
          ].map(({ heading, links }) => (
            <div key={heading} className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-800 mt-12 pt-8 gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Supracyn Pharma. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerNavigation.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
