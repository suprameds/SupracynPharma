"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  image_url: string;
  content: string;
  published: boolean;
};

type BlogFormProps = {
  initialValues?: Partial<BlogFormValues>;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  deleteAction?: (formData: FormData) => Promise<void>;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogForm({
  initialValues,
  action,
  submitLabel = "Save",
  deleteAction,
}: BlogFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [author, setAuthor] = useState(initialValues?.author ?? "");
  const [imageUrl, setImageUrl] = useState(initialValues?.image_url ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [published, setPublished] = useState<boolean>(Boolean(initialValues?.published));

  // Auto-generate slug from title if user hasn't modified slug manually
  const autoSlug = useMemo(() => slugify(title), [title]);
  useEffect(() => {
    if (!initialValues?.slug || initialValues.slug === slugify(initialValues.title ?? "")) {
      setSlug(autoSlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSlug]);

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="excerpt">Excerpt</Label>
            <span className="text-xs text-muted-foreground">
              {excerpt.length}/200
            </span>
          </div>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
            rows={3}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="url"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="space-y-2" data-color-mode="light">
          <Label>Content (Markdown)</Label>
          <input type="hidden" name="content" value={content} />
          <div className="rounded-md ring-1 ring-slate-200 overflow-hidden">
            <MDEditor value={content} onChange={(v) => setContent(v ?? "")} height={360} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            className="h-4 w-4"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <Label htmlFor="published">Published</Label>
        </div>
        {/* Sync controlled state to form for server action */}
        <input type="hidden" name="published_state" value={String(published)} />

        <div className="flex items-center gap-3">
          <Button type="submit">{submitLabel}</Button>
          {deleteAction && (
            <form
              action={deleteAction}
              onSubmit={(e) => {
                if (!confirm("Delete this post?")) e.preventDefault();
              }}
            >
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}

