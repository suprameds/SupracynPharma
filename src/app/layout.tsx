import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { WhatsAppButton } from "@/components/blocks/whatsapp-button";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/seo/google-analytics";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap", // prevents FOIT
});

const BASE_URL = "https://supracynpharma.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Supracyn Pharma | Trusted Pharmaceutical Brand — Hyderabad",
    template: "%s | Supracyn Pharma",
  },

  description:
    "Supracyn Pharma — a Hyderabad-based pharmaceutical brand marketing 600+ formulations across India. Cardiology, Diabetology, Neurology, Anti-Infectives & more. WHO-GMP certified sourcing. Distribution partnerships welcome.",

  keywords: [
    // Brand
    "Supracyn Pharma",
    "Supracyn branded medicines",
    "Supracyn pharmaceutical",
    // Location
    "pharma company Hyderabad",
    "pharmaceutical company Telangana",
    "pharma marketing company India",
    "medicine company Balkampet Hyderabad",
    // Therapy areas
    "cardiology medicines India",
    "diabetology drugs Hyderabad",
    "neurology medicines",
    "anti-infectives pharmaceuticals",
    "gastroenterology drugs India",
    "nutraceuticals pharma",
    // Key molecules
    "Telmisartan tablets",
    "Metformin SR branded",
    "Atorvastatin brand India",
    "Dapagliflozin combination",
    "Pregabalin methylcobalamin",
    "Rabeprazole domperidone",
    // Doctor/distributor facing
    "prescription medicines India",
    "MR pharma company Hyderabad",
    "pharma distribution partner India",
    "third party pharma manufacturing",
    "branded generic medicines",
    "WHO-GMP certified medicines India",
    // Hospital clients
    "Apollo Hospitals pharma",
    "KIMS Hospitals pharma supplier",
  ],

  authors: [{ name: "Supracyn Pharma", url: BASE_URL }],
  creator: "Supracyn Pharma",
  publisher: "Supracyn Pharma",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Supracyn Pharma",
    title: "Supracyn Pharma | Trusted Pharmaceutical Brand — Hyderabad",
    description:
      "600+ branded pharmaceutical formulations across Cardiology, Diabetology, Neurology & more. Hyderabad-based, WHO-GMP sourced, pan-India distribution.",
    images: [
      {
        url: "/images/hero_corporate.png",
        width: 1200,
        height: 630,
        alt: "Supracyn Pharma — Quality branded medicines trusted across India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Supracyn Pharma | Trusted Pharmaceutical Brand — Hyderabad",
    description:
      "600+ branded pharmaceutical formulations. WHO-GMP certified. Hyderabad, India.",
    images: ["/images/hero_corporate.png"],
    site: "@supracynpharma",
    creator: "@supracynpharma",
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Google Search Console site verification — add your token here
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  // },

  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd url={BASE_URL} />
      </head>
      <body className={`${inter.variable} font-sans antialiased flex min-h-screen flex-col`}>
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
