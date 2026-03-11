import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 – Page Not Found | Supracyn Pharma",
};

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-white"
      style={{ backgroundColor: "oklch(0.35 0.12 255)" }}
      aria-labelledby="not-found-heading"
    >
      <div className="w-full max-w-3xl px-6 md:px-8 py-16 md:py-24">
        <header className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 p-2">
            <Stethoscope aria-hidden="true" className="h-6 w-6 text-white" />
          </div>
          <p className="text-lg font-semibold tracking-wide text-white/90">
            Supracyn Pharma
          </p>
        </header>

        <div className="flex flex-col items-center text-center gap-6">
          <div className="text-[120px] leading-none font-black tracking-tight text-white/25 md:text-[160px]">
            404
          </div>
          <h1 id="not-found-heading" className="text-3xl md:text-4xl font-bold">
            Page Not Found
          </h1>
          <p className="text-white/80 max-w-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <Link href="/">
              <Button className="bg-white text-slate-900 hover:bg-white/90">
                Return Home
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
