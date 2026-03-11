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
    default: "Supracyn Pharma | Pharmaceutical Manufacturing Excellence",
    template: "%s | Supracyn Pharma",
  },
  description:
    "Supracyn Pharma is a WHO-GMP certified pharmaceutical manufacturer delivering high-quality formulations across 25+ countries. Explore our products, therapy areas, and partnership opportunities.",
  keywords: [
    "pharmaceutical manufacturer",
    "WHO-GMP certified",
    "generic medicines",
    "contract manufacturing",
    "pharma export India",
  ],
  authors: [{ name: "Supracyn Pharma", url: BASE_URL }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Supracyn Pharma",
    title: "Supracyn Pharma | Pharmaceutical Manufacturing Excellence",
    description:
      "WHO-GMP certified pharmaceutical manufacturer. 500+ approved formulations. Exporting to 25+ countries.",
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
    title: "Supracyn Pharma | Pharmaceutical Manufacturing Excellence",
    description:
      "WHO-GMP certified pharmaceutical manufacturer. 500+ approved formulations. Exporting to 25+ countries.",
    images: ["/images/hero_corporate.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
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
