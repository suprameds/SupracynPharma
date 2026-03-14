import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://supracynpharma.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Supracyn Pharma | Trusted Pharmaceutical Brand",
    template: "%s | Supracyn Pharma",
  },
  description:
    "Supracyn Pharma is a trusted pharmaceutical brand marketing quality, doctor-recommended medicines across India. Explore our product portfolio, therapy areas, and distribution partnerships.",
  keywords: [
    "Supracyn",
    "pharmaceutical brand India",
    "branded medicines",
    "pharma marketing company",
    "generic medicines India",
    "pharma distribution partner",
  ],
  authors: [{ name: "Supracyn Pharma", url: BASE_URL }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Supracyn Pharma",
    title: "Supracyn Pharma | Trusted Pharmaceutical Brand",
    description:
      "Supracyn — quality branded medicines trusted by doctors across India. 500+ formulations. 7 therapy areas.",
    images: [
      {
        url: "/images/hero_corporate.png",
        width: 1200,
        height: 630,
        alt: "Supracyn Pharma manufacturing facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supracyn Pharma | Trusted Pharmaceutical Brand",
    description:
      "Supracyn — quality branded medicines trusted by doctors across India. 500+ formulations. 7 therapy areas.",
    images: ["/images/hero_corporate.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { WhatsAppButton } from "@/components/blocks/whatsapp-button";

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
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
