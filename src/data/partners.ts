export type Partner = {
  name: string;
  slug: string;
  logo: string;
  url?: string;
  type: "hospital" | "education";
  region?: string;
};

// Hospital & institutional partners – logo paths are placeholders; drop real files into /public/partners.
export const HOSPITAL_PARTNERS: Partner[] = [
  {
    name: "Apollo Hospitals",
    slug: "apollo-hospitals",
    logo: "/partners/apollo-hospitals.png",
    url: "https://www.apollohospitals.com",
    type: "hospital",
    region: "Telangana",
  },
  {
    name: "KEIMED Private Limited",
    slug: "keimed",
    logo: "/partners/keimed.png",
    url: "https://www.keimed.com",
    type: "hospital",
  },
  {
    name: "Prathima Institute of Medical Sciences",
    slug: "prathima-institute-medical-sciences",
    logo: "/partners/prathima.png",
    type: "hospital",
  },
  {
    name: "CARE Hospitals",
    slug: "care-hospitals",
    logo: "/partners/care-hospitals.png",
    url: "https://www.carehospitals.com",
    type: "hospital",
  },
  {
    name: "KIMS Hospitals",
    slug: "kims-hospitals",
    logo: "/partners/kims-hospitals.png",
    url: "https://www.kimshospitals.com",
    type: "hospital",
  },
  {
    name: "Lalitha Super Specialities Hospital",
    slug: "lalitha-super-specialities-hospital",
    logo: "/partners/lalitha.png",
    type: "hospital",
  },
  {
    name: "Malla Reddy Institute of Medical Sciences",
    slug: "malla-reddy-institute-medical-sciences",
    logo: "/partners/malla-reddy.png",
    type: "education",
  },
  {
    name: "Pranaam Hospitals",
    slug: "pranaam-hospitals",
    logo: "/partners/pranaam.png",
    type: "hospital",
  },
  {
    name: "Kamineni Hospitals",
    slug: "kamineni-hospitals",
    logo: "/partners/kamineni.png",
    url: "https://www.kaminenihospitals.com",
    type: "hospital",
  },
  {
    name: "KIMS KONSEEMA Hospital",
    slug: "kims-konseema-hospital",
    logo: "/partners/kims-konseema.png",
    type: "hospital",
  },
  {
    name: "Vasu Group (Vasundhara Group of Hospitals)",
    slug: "vasu-group-hospitals",
    logo: "/partners/vasu-group.png",
    type: "hospital",
  },
  {
    name: "GSL Educational Society",
    slug: "gsl-educational-society",
    logo: "/partners/gsl-educational-society.png",
    type: "education",
  },
];

