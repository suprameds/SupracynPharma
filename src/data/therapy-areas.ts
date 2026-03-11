// Icons are used as strings here and mapped where rendered

export type TherapyArea = {
  id: string;
  name: string;
  description: string;
  iconName: string;
  /** Relative path under /public for the therapy area hero image */
  imageUrl: string;
};

export const therapyAreas: TherapyArea[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Advanced formulations supporting cardiovascular health, managing hypertension, and lipid profiles.",
    iconName: "Activity",
    imageUrl: "/images/therapy/cardiology.png",
  },
  {
    id: "neurology",
    name: "Neurology & Psychiatry",
    description: "Targeted therapies for neurological disorders, neuropathic pain, and cognitive health management.",
    iconName: "Brain",
    imageUrl: "/images/therapy/neurology.png",
  },
  {
    id: "anti-infectives",
    name: "Anti-Infectives",
    description: "Broad and narrow-spectrum antibiotics to combat bacterial, viral, and fungal infections effectively.",
    iconName: "ShieldPlus",
    imageUrl: "/images/therapy/anti-infectives.png",
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    description: "Reliable treatments for acid peptic disorders, irritable bowel syndrome, and digestive health.",
    iconName: "Stethoscope",
    imageUrl: "/images/therapy/gastroenterology.png",
  },
  {
    id: "respiratory",
    name: "Respiratory",
    description: "Formulations addressing asthma, COPD, allergic rhinitis, and other airway conditions.",
    iconName: "Wind",
    imageUrl: "/images/therapy/respiratory.png",
  },
];
