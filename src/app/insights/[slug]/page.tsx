import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/blocks/page-header";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title={post.category} 
        breadcrumbs={[
          { label: "Insights", href: "/insights" },
          { label: "Article" }
        ]}
      />

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
            src="/images/logistics_distribution.png" 
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
          
        </div>
      </article>
    </div>
  );
}
