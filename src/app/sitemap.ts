import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blog-posts";

const baseUrl = "https://supracynpharma.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/products",
    "/therapy-areas",
    "/quality",
    "/infrastructure",
    "/partnerships",
    "/insights",
    "/contact",
    "/careers",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const productPaths: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    priority: 0.7,
  }));

  const blogPaths: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    priority: 0.6,
    lastModified: new Date(post.date),
  }));

  return [...staticPaths, ...productPaths, ...blogPaths];
}

