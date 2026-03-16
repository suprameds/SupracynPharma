import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase-server";
import BlogForm from "../_components/BlogForm";

async function createPost(formData: FormData) {
  "use server";
  if (!supabaseServerClient) {
    redirect("/portal/blogs");
  }
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "");
  const category = String(formData.get("category") ?? "");
  const author = String(formData.get("author") ?? "");
  const image_url = String(formData.get("image_url") ?? "");
  const content = String(formData.get("content") ?? "");
  const published =
    String(formData.get("published_state") ?? "false") === "true";

  const payload = {
    title,
    slug,
    excerpt,
    category,
    author,
    image_url,
    content,
    published,
    published_at: published ? new Date().toISOString() : null,
  };
  await supabaseServerClient.from("blog_posts").insert(payload);
  revalidatePath("/portal/blogs");
  redirect("/portal/blogs");
}

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">New Blog Post</h1>
      <BlogForm action={createPost} submitLabel="Create Post" />
    </div>
  );
}

