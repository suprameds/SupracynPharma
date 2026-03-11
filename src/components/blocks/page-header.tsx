import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative bg-white border-b border-slate-200 overflow-hidden">
      {/* Decorative top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-accent" aria-hidden="true" />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url('/images/pattern.svg')", backgroundSize: "40px 40px" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 relative">

        {/* Breadcrumb navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 font-medium flex-wrap">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                  aria-label="Home"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              {breadcrumbs.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" aria-hidden="true" />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-800" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
