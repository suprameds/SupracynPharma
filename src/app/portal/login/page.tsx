import { Suspense } from "react";
import { LoginForm } from "./_login-form";

export const metadata = {
  title: "Admin Login | Supracyn Pharma",
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
