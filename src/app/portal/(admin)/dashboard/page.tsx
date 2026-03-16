import { supabaseServerClient } from "@/lib/supabase-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CountResult = {
  total: number;
  secondary?: number;
};

async function getCounts(): Promise<{
  blogPosts: CountResult;
  products: CountResult;
}> {
  if (!supabaseServerClient) {
    return {
      blogPosts: { total: 0, secondary: 0 },
      products: { total: 0, secondary: 0 },
    };
  }

  const [blogTotalRes, blogPublishedRes, prodTotalRes, prodFeaturedRes] =
    await Promise.all([
      supabaseServerClient.from("blog_posts").select("id", { count: "exact", head: true }),
      supabaseServerClient
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("published", true),
      supabaseServerClient.from("products").select("id", { count: "exact", head: true }),
      supabaseServerClient
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("is_featured", true),
    ]);

  return {
    blogPosts: {
      total: blogTotalRes.count ?? 0,
      secondary: blogPublishedRes.count ?? 0,
    },
    products: {
      total: prodTotalRes.count ?? 0,
      secondary: prodFeaturedRes.count ?? 0,
    },
  };
}

type InquiryRow = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

async function getRecentInquiries(): Promise<InquiryRow[]> {
  if (!supabaseServerClient) return [];
  const { data } = await supabaseServerClient
    .from("inquiries")
    .select("id,name,email,created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function DashboardPage() {
  const [counts, recent] = await Promise.all([getCounts(), getRecentInquiries()]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.blogPosts.total}</div>
            <p className="text-sm text-muted-foreground">
              Published: {counts.blogPosts.secondary}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.products.total}</div>
            <p className="text-sm text-muted-foreground">
              Featured: {counts.products.secondary}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inquiries (Last 5)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recent.length}</div>
            <p className="text-sm text-muted-foreground">Most recent shown below</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg ring-1 ring-slate-200">
        <div className="px-4 py-3 border-b">
          <h2 className="font-medium">Recent Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {recent.map((inq) => (
                <tr key={inq.id}>
                  <td className="px-4 py-2">{inq.name}</td>
                  <td className="px-4 py-2">{inq.email}</td>
                  <td className="px-4 py-2">
                    {new Date(inq.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={3}>
                    No recent inquiries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

