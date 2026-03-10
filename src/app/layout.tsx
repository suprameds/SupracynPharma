import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supracyn Pharma | Corporate Credibility & Excellence",
  description: "Supracyn Pharma is a trusted pharmaceutical company dedicated to quality standards, robust infrastructure, and business partnerships in the healthcare sector.",
  icons: {
    icon: "/favicon.ico",
  },
};

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
