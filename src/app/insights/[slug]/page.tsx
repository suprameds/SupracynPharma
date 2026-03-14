import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/json-ld";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const title = post?.title
    ? `${post.title} | Supracyn Pharma`
    : "Insights | Supracyn Pharma";
  const baseDescription =
    post?.excerpt ??
    "Explore expert pharmaceutical insights, manufacturing practices, and compliance perspectives from Supracyn Pharma.";
  const description =
    baseDescription.length > 160
      ? `${baseDescription.slice(0, 157)}...`
      : baseDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post?.date,
      images: post?.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://supracynpharma.com/insights/${post.slug}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://supracynpharma.com" },
          { name: "Insights", url: "https://supracynpharma.com/insights" },
          { name: post.title, url: postUrl },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        imageUrl={post.imageUrl}
        publishedDate={post.date}
      />
      {/* Top bar - breadcrumb only, no h1 */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href="/insights"
                  className="hover:text-primary transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li className="text-slate-800 font-medium" aria-current="page">
                {post.category}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500 font-medium">
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center"><User className="h-4 w-4 mr-2" /> {post.author}</span>
            </div>
          </header>

          <div className="aspect-[21/9] w-full bg-slate-100 rounded-3xl overflow-hidden mb-12 relative shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
        </div>

          <div 
            className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-slate-100">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-bold text-slate-900 mb-2">About the Author</h4>
              <p className="text-slate-600 text-sm">
                This article was contributed by {post.author}. Supracyn Pharma is dedicated to bringing quality perspectives to the pharmaceutical industry.
              </p>
            </div>
          </div>

          {/* More from Insights */}
          <div className="mt-16 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">More from Insights</h3>
              <Link
                href="/insights"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/insights/${p.slug}`}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow w-full"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">
                        {p.title}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                        {p.excerpt}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {new Date(p.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
 
        </div>
      </article>
    </div>
  );
}
