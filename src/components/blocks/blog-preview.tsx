import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";

/** Latest 3 blog posts preview for the homepage. Server Component. */
export function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  const CATEGORY_COLORS: Record<string, string> = {
    Cardiology: "bg-rose-100 text-rose-700",
    Diabetology: "bg-blue-100 text-blue-700",
    "Anti-Infectives": "bg-emerald-100 text-emerald-700",
    Neurology: "bg-indigo-100 text-indigo-700",
    Gastroenterology: "bg-orange-100 text-orange-700",
    Nutrition: "bg-amber-100 text-amber-700",
    General: "bg-slate-100 text-slate-700",
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #f0fdf4 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Medical Insights
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Latest from Our{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
                }}
              >
                Knowledge Hub
              </span>
            </h2>
            <p className="text-slate-600 text-lg">
              Insights for healthcare professionals on therapy trends, drug
              profiles, and India&apos;s pharmaceutical landscape.
            </p>
          </div>
          <Link href="/insights">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary hover:bg-primary/5"
            >
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => {
            const colorClass =
              CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS["General"];
            return (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Colored top bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    backgroundImage:
                      idx === 0
                        ? "linear-gradient(90deg, #1d4ed8, #0ea5e9)"
                        : idx === 1
                          ? "linear-gradient(90deg, #059669, #0d9488)"
                          : "linear-gradient(90deg, #7c3aed, #db2777)",
                  }}
                />

                <div className="p-6 flex flex-col flex-1 space-y-4">
                  {/* Category + date */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${colorClass}`}
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 leading-snug text-base group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div
                    className={`inline-flex items-center gap-1 text-xs font-bold transition-colors group-hover:gap-2 ${
                      idx === 0
                        ? "text-blue-600"
                        : idx === 1
                          ? "text-emerald-600"
                          : "text-purple-600"
                    }`}
                  >
                    Read Article <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

