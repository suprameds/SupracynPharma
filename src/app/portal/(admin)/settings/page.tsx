import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SiteSetting = {
  key: string;
  value: string | null;
  label: string | null;
  description: string | null;
  updated_at: string | null;
};

async function getSettings(): Promise<SiteSetting[]> {
  if (!supabaseServerClient) return [];
  const { data } = await supabaseServerClient
    .from("site_settings")
    .select("key,value,label,description,updated_at")
    .order("key", { ascending: true });
  return (data ?? []) as SiteSetting[];
}

function groupOf(key: string): "Stats" | "Contact Info" | "Other" {
  if (key.startsWith("stats.") || key.startsWith("stat.") || key.includes("stats")) {
    return "Stats";
  }
  if (key.startsWith("contact.") || key.includes("contact")) {
    return "Contact Info";
  }
  return "Other";
}

export async function saveSetting(formData: FormData) {
  "use server";
  if (!supabaseServerClient) return;
  const key = String(formData.get("key"));
  const value = String(formData.get("value") ?? "");
  await supabaseServerClient
    .from("site_settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key);
  revalidatePath("/portal/settings");
}

export default async function SettingsPage() {
  const settings = await getSettings();
  const groups: Record<string, SiteSetting[]> = {};
  for (const s of settings) {
    const g = groupOf(s.key);
    groups[g] = groups[g] ?? [];
    groups[g].push(s);
  }

  const orderedGroups = ["Stats", "Contact Info", "Other"] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Site Settings</h1>
      {orderedGroups.map((g) => {
        const rows = groups[g] ?? [];
        if (rows.length === 0) return null;
        return (
          <div key={g} className="rounded-lg ring-1 ring-slate-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium">{g}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {rows.map((s) => (
                <div key={s.key} className="p-4 grid gap-2 md:grid-cols-[240px_1fr_auto]">
                  <div>
                    <div className="font-medium">{s.label ?? s.key}</div>
                    {s.description && (
                      <div className="text-sm text-muted-foreground">{s.description}</div>
                    )}
                  </div>
                  <form action={saveSetting} className="flex items-center gap-2">
                    <input type="hidden" name="key" value={s.key} />
                    <Input
                      name="value"
                      defaultValue={s.value ?? ""}
                      className="w-full"
                    />
                    <Button type="submit" variant="outline" size="sm">
                      Save
                    </Button>
                  </form>
                  <div className="text-xs text-right text-slate-500 self-center">
                    {s.updated_at ? new Date(s.updated_at).toLocaleString() : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

