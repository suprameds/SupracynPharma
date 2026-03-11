export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Portfolio",
    href: "/products",
    children: [
      { label: "All Products", href: "/products", description: "Browse our full catalogue of 500+ approved formulations" },
      { label: "Therapy Areas", href: "/therapy-areas", description: "Cardiology, neurology, respiratory, and more" },
      { label: "Quality & Compliance", href: "/quality", description: "WHO-GMP standards, certifications, and QA processes" },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    children: [
      { label: "Manufacturing", href: "/infrastructure", description: "Solid and liquid dosage lines with 1B+ tablet capacity" },
      { label: "R&D & Innovation", href: "/infrastructure", description: "Dedicated labs for formulation and stability studies" },
    ],
  },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Insights", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNavigation = {
  company: [
    { label: "About Supracyn", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  products: [
    { label: "Therapy Areas", href: "/therapy-areas" },
    { label: "Our Portfolio", href: "/products" },
    { label: "Quality Standards", href: "/quality" },
    { label: "Suprameds (Online Order)", href: "/buy-suprameds" },
  ],
  partnerships: [
    { label: "Distributor Inquiry", href: "/partnerships#distributors" },
    { label: "Third-Party Manufacturing", href: "/partnerships#manufacturing" },
    { label: "Hospital Supply", href: "/partnerships#institutions" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ]
};
