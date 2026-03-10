import Link from "next/link";
import { footerNavigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-sm bg-primary" />
              <span className="font-bold text-xl tracking-tight text-primary">Supracyn Pharma</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mt-4">
              A trusted pharmaceutical corporate entity dedicated to manufacturing excellence, rigorous quality standards, and empowering healthcare ecosystems globally.
            </p>
            <div className="pt-4">
              <div className="text-sm text-muted-foreground">
                <p>Corporate Office:</p>
                <p className="font-medium text-foreground">Supracyn House, Industrial Area,</p>
                <p>New Delhi, India - 110020</p>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {footerNavigation.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Products & Quality</h4>
            <ul className="space-y-2">
              {footerNavigation.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Partnerships</h4>
            <ul className="space-y-2">
              {footerNavigation.partnerships.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t mt-12 pt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Supracyn Pharma. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {footerNavigation.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
