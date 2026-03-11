import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServerClient } from "@/lib/supabase-server";

const inquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3),
  message: z.string().min(10),
  type: z.enum(["general", "partnership", "product"]).default("general"),
  partnershipType: z.string().optional(),
  product: z.string().optional(),
});

export async function POST(request: Request) {
  if (!supabaseServerClient) {
    return NextResponse.json(
      { error: "Inquiry backend is not configured" },
      { status: 503 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const { error } = await supabaseServerClient
    .from("inquiries")
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      message: data.message,
      type: data.type,
      partnership_type: data.partnershipType ?? null,
      product: data.product ?? null,
      created_at: new Date().toISOString(),
    });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[Inquiry API] Supabase insert failed", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

