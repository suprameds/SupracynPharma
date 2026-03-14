// Icons are passed as strings

export type TrustSignal = {
  id: string;
  title: string;
  description: string;
  iconName: string;
};

export const trustSignals: TrustSignal[] = [
  {
    id: "brand-quality",
    title: "Quality You Can Trust",
    description: "Every Supracyn-branded product is sourced from WHO-GMP certified facilities and meets international safety standards.",
    iconName: "ShieldCheck",
  },
  {
    id: "pan-india",
    title: "Pan-India Presence",
    description: "Supracyn products are available through pharmacies and hospital networks across major Indian states.",
    iconName: "MapPin",
  },
  {
    id: "portfolio",
    title: "500+ Formulations",
    description: "A broad portfolio of Supracyn-branded medicines spanning 7 critical therapy areas.",
    iconName: "Factory",
  },
  {
    id: "doctors-trust",
    title: "Trusted by Doctors",
    description: "Supracyn formulations are recommended by healthcare professionals and institutions across India.",
    iconName: "Award",
  }
];
