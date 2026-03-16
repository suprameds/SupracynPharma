import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase-server";
import { CATEGORY_LABELS } from "@/lib/supabase-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

async function createProduct(formData: FormData) {
  "use server";
  if (!supabaseServerClient) redirect("/portal/products");
  const name = String(formData.get("name") ?? "");
  const composition = String(formData.get("composition") ?? "");
  const category = String(formData.get("category") ?? "");
  const form = String(formData.get("form") ?? "");
  const is_featured = String(formData.get("is_featured") ?? "false") === "true";
  const is_active = String(formData.get("is_active") ?? "true") === "true";

  await supabaseServerClient.from("products").insert({
    name,
    composition,
    category,
    form,
    is_featured,
    is_active,
  });
  revalidatePath("/portal/products");
  redirect("/portal/products");
}

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
      <form action={createProduct} className="space-y-4 max-w-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form">Form</Label>
            <Input id="form" name="form" placeholder="Tab / Cap / Syrup / ..." />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="composition">Composition</Label>
          <Textarea id="composition" name="composition" rows={3} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="is_featured">Featured</Label>
            <select
              id="is_featured"
              name="is_featured"
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
              defaultValue="false"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="is_active">Active</Label>
            <select
              id="is_active"
              name="is_active"
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
              defaultValue="true"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  );
}

