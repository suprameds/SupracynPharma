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
                Distribute the Supracyn brand in your market
              </h2>
              <p className="text-slate-400 text-sm max-w-md">
                Distributors, pharmacy chains, and hospital procurement teams — reach out and our team will respond within 24 hours.
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
              Supracyn is a trusted pharmaceutical brand marketing quality, doctor-recommended medicines across India and 25+ international markets.
            </p>
            <div className="text-sm text-slate-400 space-y-1 pt-2">
              <p className="font-medium text-slate-300">Corporate Office</p>
              <p>Supracyn House, Industrial Area,</p>
              <p>New Delhi, India &mdash; 110020</p>
              <a href="mailto:info@supracynpharma.com" className="block mt-2 text-primary hover:text-primary/80 transition-colors font-medium">
                info@supracynpharma.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://linkedin.com/company/supracyn-pharma"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Supracyn Pharma on LinkedIn"
                className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/911123456789"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Supracyn Pharma on WhatsApp"
                className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-green-600 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
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
