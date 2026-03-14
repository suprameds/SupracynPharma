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
    name: "Cardiology & Hypertension",
    description: "Supracyn formulations supporting cardiovascular health, blood pressure management, and lipid control.",
    iconName: "Activity",
    imageUrl: "/images/therapy/cardiology.png",
  },
  {
    id: "diabetology",
    name: "Diabetology",
    description: "A focused range of Supracyn anti-diabetic medicines for effective blood glucose management and metabolic health.",
    iconName: "Pill",
    imageUrl: "/images/therapy/anti-infectives.png",
  },
  {
    id: "anti-infectives",
    name: "Anti-Infectives",
    description: "Broad and narrow-spectrum Supracyn antibiotics and anti-fungals to treat bacterial and fungal infections.",
    iconName: "ShieldPlus",
    imageUrl: "/images/therapy/anti-infectives.png",
  },
  {
    id: "gynaecology",
    name: "Gynaecology",
    description: "Supracyn formulations addressing hormonal health, reproductive wellness, and gynaecological ailments.",
    iconName: "Stethoscope",
    imageUrl: "/images/therapy/gastroenterology.png",
  },
  {
    id: "pain-management",
    name: "Pain Management",
    description: "Supracyn analgesic and anti-inflammatory formulations for effective relief from acute and chronic pain.",
    iconName: "Wind",
    imageUrl: "/images/therapy/respiratory.png",
  },
  {
    id: "vitamins-nutrition",
    name: "Vitamins & Nutrition",
    description: "Supracyn nutritional supplements and vitamin formulations addressing common deficiencies for all age groups.",
    iconName: "Brain",
    imageUrl: "/images/therapy/neurology.png",
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    description: "Reliable Supracyn treatments for acid peptic disorders, digestive health, and gastrointestinal conditions.",
    iconName: "Stethoscope",
    imageUrl: "/images/therapy/gastroenterology.png",
  },
];
