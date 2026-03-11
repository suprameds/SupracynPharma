export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  content: string; // HTML or Markdown placeholder
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Advancements in Solid Dosage Manufacturing Techniques",
    slug: "advancements-solid-dosage-manufacturing",
    excerpt: "Exploring the latest quality control methodologies and automation in solid dosage pharmaceutical manufacturing.",
    date: "2024-03-15",
    author: "Supracyn Quality Team",
    category: "Manufacturing",
    imageUrl: "/images/blog/manufacturing.jpg",
    content: "<p>Quality control in solid dosage manufacturing has reached new heights...</p>",
  },
  {
    id: "2",
    title: "Navigating Global Compliance: The WHO-GMP Standard",
    slug: "navigating-global-compliance-who-gmp",
    excerpt: "Understanding the importance of WHO-GMP certification in ensuring global supply chain integrity.",
    date: "2024-02-28",
    author: "Regulatory Affairs",
    category: "Compliance",
    imageUrl: "/images/blog/compliance.jpg",
    content: "<p>The WHO Good Manufacturing Practices (GMP) serve as the backbone...</p>",
  },
  {
    id: "3",
    title: "Bridging the Gap: From Corporate Manufacturing to Pharmacy Retail",
    slug: "corporate-manufacturing-to-pharmacy-retail",
    excerpt: "How Supracyn Pharma partners with distributors and retailers to ensure seamless product availability.",
    date: "2024-02-10",
    author: "Supracyn Business Development",
    category: "Partnerships",
    imageUrl: "/images/blog/partnerships.jpg",
    content: "<p>A robust pharmaceutical supply chain depends on strong partnerships...</p>",
  }
];
