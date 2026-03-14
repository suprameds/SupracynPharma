import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

const baseUrl = "https://supracynpharma.com";

/**
 * XML sitemap served at /sitemap.xml.
 *
 * Products from Supabase are NOT given individual URLs here because the
 * /products/[id] pages only cover the legacy 5 static products.
 * The /products page with category filters is the canonical product destination.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/products`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/therapy-areas`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/quality`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/infrastructure`, priority: 0.65, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/partnerships`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/insights`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/careers`, priority: 0.6, changeFrequency: "monthly" as const },
  ].map((entry) => ({ ...entry, lastModified: now }));

  // Category-filtered product pages — each is a meaningful landing page
  const productCategoryPaths: MetadataRoute.Sitemap = [
    "cardiology",
    "diabetology",
    "cholesterol",
    "anti-infectives",
    "hormones",
    "nutraceuticals",
    "urology",
    "neurology",
    "nephrology",
    "gastroenterology",
    "miscellaneous",
  ].map((cat) => ({
    url: `${baseUrl}/products?category=${cat}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPaths: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
    lastModified: new Date(post.date),
  }));

  return [...staticPaths, ...productCategoryPaths, ...blogPaths];
}
