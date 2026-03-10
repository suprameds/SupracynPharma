import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex mb-6 text-sm text-slate-500 font-medium">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((item) => (
                <li key={item.label} className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-800">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        
      </div>
    </div>
  );
}
