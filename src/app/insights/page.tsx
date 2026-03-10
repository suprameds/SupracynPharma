import { PageHeader } from "@/components/blocks/page-header";
import { blogPosts } from "@/data/blog-posts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Insights & Updates | Supracyn Pharma",
  description: "Stay updated with Supracyn Pharma's corporate announcements, manufacturing insights, and healthcare industry perspectives.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader 
        title="Insights & Corporate Updates" 
        subtitle="Industry perspectives, manufacturing excellence highlights, and our latest corporate announcements."
        breadcrumbs={[
          { label: "Insights" }
        ]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/insights/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-slate-200 overflow-hidden bg-white group cursor-pointer flex flex-col">
                  <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                    <Image 
                      src="/images/logistics_distribution.png" 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                  </div>
                  <CardHeader className="pb-3 pt-6 flex-grow-0">
                    <div className="mb-3">
                      <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                        {post.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pb-6 flex-1 flex flex-col justify-between">
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-slate-400 font-medium space-x-4">
                      <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" /> {post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
