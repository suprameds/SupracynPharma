import Link from "next/link";
import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeletePostForm } from "./_components/delete-post-form";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  category: string | null;
  image_url: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
};

export async function togglePublish(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const desired = String(formData.get("desired")) === "true";
  if (!supabaseServerClient || !Number.isFinite(id)) return;
  const payload: Record<string, unknown> = {
    published: desired,
    updated_at: new Date().toISOString(),
  };
  if (desired) {
    payload.published_at = new Date().toISOString();
  } else {
    payload.published_at = null;
  }
  await supabaseServerClient.from("blog_posts").update(payload).eq("id", id);
  revalidatePath("/portal/blogs");
}

export async function deletePost(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!supabaseServerClient || !Number.isFinite(id)) return;
  await supabaseServerClient.from("blog_posts").delete().eq("id", id);
  revalidatePath("/portal/blogs");
}

async function getPosts(): Promise<BlogPost[]> {
  if (!supabaseServerClient) return [];
  const { data } = await supabaseServerClient
    .from("blog_posts")
    .select(
      "id,title,slug,excerpt,content,author,category,image_url,published,published_at,created_at,updated_at"
    )
    .order("created_at", { ascending: false });
  return (data as BlogPost[]) ?? [];
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Blog Posts</h1>
        <Link href="/portal/blogs/new">
          <Button>New Post</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg ring-1 ring-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Title
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Category
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Author
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Published
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Published At
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-slate-500">{p.slug}</div>
                </td>
                <td className="px-4 py-2">{p.category ?? "-"}</td>
                <td className="px-4 py-2">{p.author ?? "-"}</td>
                <td className="px-4 py-2">
                  {p.published ? (
                    <Badge>Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </td>
                <td className="px-4 py-2">
                  {p.published_at
                    ? new Date(p.published_at).toLocaleString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/portal/blogs/${p.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={p.id} />
                      <input
                        type="hidden"
                        name="desired"
                        value={String(!p.published)}
                      />
                      <Button type="submit" size="sm" variant="secondary">
                        {p.published ? "Unpublish" : "Publish"}
                      </Button>
                    </form>
                    <DeletePostForm postId={p.id} action={deletePost} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-500" colSpan={6}>
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

