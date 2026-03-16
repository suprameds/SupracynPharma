import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 – Page Not Found | Supracyn Pharma",
};

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-slate-50"
      aria-labelledby="not-found-heading"
    >
      <div className="w-full max-w-3xl px-6 md:px-8 py-16 md:py-24">
        <header className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center justify-center">
            <Image
              src="/images/logo-icon.svg"
              alt=""
              width={48}
              height={72}
              className="h-12 w-auto"
              aria-hidden="true"
            />
          </div>
          <p className="text-lg font-semibold tracking-wide text-slate-900">
            Supracyn Pharma
          </p>
        </header>

        <div className="flex flex-col items-center text-center gap-6">
          <div className="text-[120px] leading-none font-black tracking-tight text-slate-200 md:text-[160px]">
            404
          </div>
          <h1 id="not-found-heading" className="text-3xl md:text-4xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-slate-600 max-w-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <Link href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Return Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
