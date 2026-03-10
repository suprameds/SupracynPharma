export type Product = {
  id: string;
  name: string;
  genericName: string;
  therapyAreaId: string;
  dosageForm: string;
  strength: string;
  packSize: string;
  summary: string;
  highlights: string[];
  packagingStorage: string;
  isAvailableOnline: boolean;
};

export const products: Product[] = [
  {
    id: "supra-cv-625",
    name: "SupraCV 625",
    genericName: "Amoxicillin and Potassium Clavulanate Tablets IP",
    therapyAreaId: "anti-infectives",
    dosageForm: "Tablet",
    strength: "625 mg",
    packSize: "10 x 10 Alu-Alu",
    summary: "A broad-spectrum antibiotic used for the treatment of various bacterial infections.",
    highlights: ["High bioavailability", "Effective against beta-lactamase producing strains", "WHO-GMP certified manufacturing"],
    packagingStorage: "Store below 25°C, protected from moisture. Keep out of reach of children.",
    isAvailableOnline: true,
  },
  {
    id: "supra-pan-40",
    name: "SupraPan 40",
    genericName: "Pantoprazole Gastro-resistant Tablets IP",
    therapyAreaId: "gastroenterology",
    dosageForm: "Tablet",
    strength: "40 mg",
    packSize: "10 x 10 Alu-Alu",
    summary: "Proton pump inhibitor utilized for the management of acid reflux and peptic ulcer disease.",
    highlights: ["Rapid acid suppression", "Extended duration of action", "Excellent safety profile"],
    packagingStorage: "Store protected from light and moisture, at a temperature not exceeding 30°C.",
    isAvailableOnline: true,
  },
  {
    id: "supratuss-dx",
    name: "SupraTuss DX",
    genericName: "Dextromethorphan, Chlorpheniramine & Phenylephrine Syrup",
    therapyAreaId: "respiratory",
    dosageForm: "Syrup",
    strength: "100 ml",
    packSize: "100 ml Bottle with Measuring Cap",
    summary: "Triple-action composition for symptomatic relief from dry cough and allergic rhinitis.",
    highlights: ["Non-drowsy formulation", "Fast-acting relief", "Sugar-free base available"],
    packagingStorage: "Store in a cool, dry place away from direct sunlight.",
    isAvailableOnline: false,
  },
  {
    id: "supracard-10",
    name: "SupraCard 10",
    genericName: "Rosuvastatin Tablets IP",
    therapyAreaId: "cardiology",
    dosageForm: "Tablet",
    strength: "10 mg",
    packSize: "10 x 10 Blister",
    summary: "High-efficacy statin for the management of hyperlipidemia and cardiovascular risk reduction.",
    highlights: ["Significantly lowers LDL-C", "Improves overall lipid profile", "Convenient once-daily dosing"],
    packagingStorage: "Store below 30°C in a dry place. Protect from light.",
    isAvailableOnline: false,
  },
  {
    id: "supranerv-plus",
    name: "SupraNerv Plus",
    genericName: "Pregabalin and Methylcobalamin Capsules",
    therapyAreaId: "neurology",
    dosageForm: "Capsule",
    strength: "75 mg / 1500 mcg",
    packSize: "10 x 10 Alu-Alu",
    summary: "Synergistic combination for the effective management of peripheral neuropathy and neuropathic pain.",
    highlights: ["Restores nerve function", "Reduces pain signaling", "Well-tolerated profile"],
    packagingStorage: "Store in a dry place below 25°C.",
    isAvailableOnline: true,
  }
];
