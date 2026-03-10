export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Portfolio",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Therapy Areas", href: "/therapy-areas" },
      { label: "Quality & Compliance", href: "/quality" },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    children: [
      { label: "Manufacturing", href: "/infrastructure#manufacturing" },
      { label: "R&D", href: "/infrastructure#research" },
    ]
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
