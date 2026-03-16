import { supabaseServerClient } from "@/lib/supabase-server";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function getClient() {
  return supabaseServerClient;
}

// Get all published posts ordered by published_at desc
export async function getBlogPosts(): Promise<BlogPost[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[supabase-blogs] getBlogPosts error:", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

// Get a single published post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("[supabase-blogs] getBlogPostBySlug error:", error.message);
    }
    return null;
  }
  return (data ?? null) as BlogPost | null;
}

// Get all published slugs (for generateStaticParams)
export async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("blog_posts")
    .select("slug")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[supabase-blogs] getAllBlogSlugs error:", error.message);
    return [];
  }
  return ((data ?? []) as { slug: string }[]).filter((row) => !!row.slug);
}

// Get all posts (including unpublished) — for admin use only, uses service role client
export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[supabase-blogs] getAllBlogPostsAdmin error:", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

