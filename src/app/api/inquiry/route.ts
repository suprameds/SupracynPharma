import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServerClient } from "@/lib/supabase-server";

// ---------------------------------------------------------------------------
// Simple in-process rate limiter
// Keeps the last submission timestamp per IP. Resets when the server restarts.
// For production at scale, replace with an edge-compatible store (e.g. Upstash Redis).
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;            // max 3 submissions per window per IP

const rateStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const inquirySchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  company: z.string().min(1).max(200),
  email: z.string().email().max(254),
  phone: z.string().min(3).max(30),
  message: z.string().min(10).max(2000),
  type: z.enum(["general", "partnership", "product"]).default("general"),
  // Reject empty strings for contextual optional fields
  partnershipType: z.string().min(1).max(100).optional(),
  product: z.string().min(1).max(100).optional(),
});

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Derive client IP (works on Vercel; falls back to a placeholder in dev)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 },
    );
  }

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
      // Let the DB default (now()) handle created_at; explicit value kept for clarity
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error("[Inquiry API] Supabase insert failed", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
