"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error: _error, reset }: ErrorPageProps) {
  return (
    <main className="min-h-screen bg-white text-slate-800 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-amber-50 text-amber-600 p-3 ring-1 ring-amber-200">
          <AlertTriangle aria-hidden="true" className="h-6 w-6" />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-slate-600">
          An unexpected error occurred. Our team has been notified.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => reset()}>Try Again</Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
