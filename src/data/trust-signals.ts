// Icons are passed as strings

export type TrustSignal = {
  id: string;
  title: string;
  description: string;
  iconName: string;
};

export const trustSignals: TrustSignal[] = [
  {
    id: "who-gmp",
    title: "WHO-GMP Certified",
    description: "State-of-the-art manufacturing facilities adhering strictly to global quality guidelines.",
    iconName: "ShieldCheck",
  },
  {
    id: "global-reach",
    title: "Global Reach",
    description: "Supplying trusted formulations and APIs to partners across 25+ countries worldwide.",
    iconName: "Globe",
  },
  {
    id: "infrastructure",
    title: "Robust Infrastructure",
    description: "High-volume production capabilities spanning solid, liquid, and injectable dosage forms.",
    iconName: "Factory",
  },
  {
    id: "quality",
    title: "Uncompromising Quality",
    description: "Rigorous end-to-end testing from raw material sourcing to final batch release.",
    iconName: "Award",
  }
];
