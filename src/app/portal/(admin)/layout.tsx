import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase-auth-server";
import { PortalSidebar, MobileNav } from "../_components/sidebar-nav";

async function signOut(): Promise<void> {
  "use server";
  const supabase = await createAuthServerClient();
  await supabase.auth.signOut();
  redirect("/portal/login");
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-[240px] bg-slate-900 text-slate-200">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 h-16 border-b border-slate-800 shrink-0">
          <div className="h-8 w-8 rounded bg-primary shrink-0" aria-hidden="true" />
          <div className="flex flex-col min-w-0">
            <span className="text-white font-semibold leading-tight truncate">Supracyn Pharma</span>
            <span className="text-xs text-slate-400">Admin</span>
          </div>
        </div>

        {/* Nav — icons live entirely inside PortalSidebar (client component) */}
        <PortalSidebar />

        {/* User + sign-out */}
        <div className="border-t border-slate-800 p-3 shrink-0">
          <div className="px-2 py-1 mb-2">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="truncate text-sm text-white">{user?.email ?? "Unknown"}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full rounded-md bg-slate-800 text-slate-200 hover:bg-red-900 hover:text-white px-3 py-2 text-sm transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-900 text-slate-200 border-b border-slate-800">
        <div className="h-14 px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-7 rounded bg-primary" aria-hidden="true" />
            <span className="text-white font-semibold text-sm">Supracyn Admin</span>
          </div>
          <MobileNav />
        </div>
      </div>

      {/* Page content */}
      <main className="md:pl-[240px] min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
