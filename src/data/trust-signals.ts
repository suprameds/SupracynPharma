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
    id: "global-reach",
    title: "Present in 25+ Markets",
    description: "Supracyn products are available across India, Africa, the Middle East, and Southeast Asia.",
    iconName: "Globe",
  },
  {
    id: "portfolio",
    title: "500+ Formulations",
    description: "A broad portfolio of Supracyn-branded medicines spanning 6 critical therapy areas.",
    iconName: "Factory",
  },
  {
    id: "doctors-trust",
    title: "Trusted by Doctors",
    description: "Supracyn formulations are recommended by healthcare professionals and institutions across markets.",
    iconName: "Award",
  }
];
