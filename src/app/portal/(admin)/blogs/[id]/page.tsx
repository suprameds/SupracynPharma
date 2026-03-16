import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase-server";
import BlogForm, { type BlogFormValues } from "../_components/BlogForm";

type Params = { params: { id: string } };

async function getPost(id: number): Promise<Partial<BlogFormValues> & { id: number }> {
  if (!supabaseServerClient) return notFound() as never;
  const { data } = await supabaseServerClient
    .from("blog_posts")
    .select(
      "id,title,slug,excerpt,content,author,category,image_url,published"
    )
    .eq("id", id)
    .single();
  if (!data) return notFound() as never;
  return data as Partial<BlogFormValues> & { id: number };
}

export default async function EditBlogPage({ params }: Params) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();
  const post = await getPost(id);

  async function updatePost(formData: FormData) {
    "use server";
    if (!supabaseServerClient) redirect("/portal/blogs");
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
      updated_at: new Date().toISOString(),
    };
    await supabaseServerClient.from("blog_posts").update(payload).eq("id", id);
    revalidatePath("/portal/blogs");
    redirect("/portal/blogs");
  }

  async function deletePost() {
    "use server";
    if (!supabaseServerClient) redirect("/portal/blogs");
    await supabaseServerClient.from("blog_posts").delete().eq("id", id);
    revalidatePath("/portal/blogs");
    redirect("/portal/blogs");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Blog Post</h1>
      <BlogForm
        initialValues={post}
        action={updatePost}
        deleteAction={deletePost}
        submitLabel="Save Changes"
      />
    </div>
  );
}

