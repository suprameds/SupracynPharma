"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Pill,
  Settings,
  Inbox,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Nav items defined entirely inside the client module — icons never cross the RSC boundary
const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/portal/dashboard", label: "Dashboard",  icon: LayoutDashboard },
  { href: "/portal/blogs",     label: "Blog Posts", icon: FileText        },
  { href: "/portal/products",  label: "Products",   icon: Pill            },
  { href: "/portal/settings",  label: "Settings",   icon: Settings        },
  { href: "/portal/inquiries", label: "Inquiries",  icon: Inbox           },
];

function isActive(pathname: string, href: string) {
  if (href === "/portal/dashboard") return pathname === href;
  return pathname.startsWith(href);
}

export function PortalSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-2 py-3 space-y-1" aria-label="Admin navigation">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={[
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-slate-300 hover:bg-slate-800 hover:text-white",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1 flex-wrap" aria-label="Admin mobile navigation">
      {NAV_ITEMS.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={[
              "rounded px-2 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-slate-300 hover:bg-slate-700 hover:text-white",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
