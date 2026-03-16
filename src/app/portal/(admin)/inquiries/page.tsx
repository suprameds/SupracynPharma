import Link from "next/link";
import { supabaseServerClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";

type SearchParams = {
  page?: string;
};

type Inquiry = {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  therapy_areas: string[] | null;
  message: string | null;
  created_at: string;
};

const PAGE_SIZE = 20;

async function getInquiries(params: SearchParams): Promise<{
  data: Inquiry[];
  total: number;
  page: number;
}> {
  if (!supabaseServerClient) return { data: [], total: 0, page: 1 };
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data, count } = await supabaseServerClient
    .from("inquiries")
    .select("id,name,company,email,phone,therapy_areas,message,created_at", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);
  return { data: (data ?? []) as Inquiry[], total: count ?? 0, page };
}

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data, total, page } = await getInquiries(searchParams);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Inquiries</h1>

      <div className="rounded-lg ring-1 ring-slate-200 bg-white overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Name / Company
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Contact
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Therapy Areas
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Message
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((q) => (
              <tr key={q.id}>
                <td className="px-4 py-2">
                  <div className="font-medium">{q.name}</div>
                  <div className="text-xs text-slate-500">{q.company}</div>
                </td>
                <td className="px-4 py-2">
                  <div>{q.email}</div>
                  {q.phone && <div className="text-xs text-slate-600">{q.phone}</div>}
                </td>
                <td className="px-4 py-2">
                  {q.therapy_areas && q.therapy_areas.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {q.therapy_areas.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="max-w-[420px] truncate">{q.message}</div>
                </td>
                <td className="px-4 py-2">
                  {new Date(q.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-500" colSpan={5}>
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Page {page} of {totalPages} • {total} total
        </div>
        <div className="flex items-center gap-2">
          {page <= 1 ? (
            <Button variant="outline" size="sm" disabled>Previous</Button>
          ) : (
            <Link href={{ pathname: "/portal/inquiries", query: { page: page - 1 } }}>
              <Button variant="outline" size="sm">Previous</Button>
            </Link>
          )}
          {page >= totalPages ? (
            <Button variant="outline" size="sm" disabled>Next</Button>
          ) : (
            <Link href={{ pathname: "/portal/inquiries", query: { page: page + 1 } }}>
              <Button variant="outline" size="sm">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

