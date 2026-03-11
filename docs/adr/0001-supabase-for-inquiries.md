---
status: Accepted
date: 2026-03-10
---

# ADR 0001: Use Supabase to store website inquiries

## Context

The Supracyn Pharma marketing site includes an inquiry form that allows potential partners and customers to contact the company. Initially, this form only simulated a submission on the client with no persistence or backend processing.

We want a simple, reliable way to:

- Persist inbound inquiries for later review.
- Avoid adding and operating a full custom backend.
- Keep the rest of the site primarily static for performance and simplicity.

## Decision

We will:

- Use **Supabase** as a managed Postgres backend to store website inquiries.
- Add a **Next.js API route** at `/api/inquiry` that:
  - Validates the request body with Zod.
  - Inserts validated inquiries into a Supabase `inquiries` table.
- Configure Supabase access via environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

The integration is limited to this inquiry flow; product, therapy, and blog content remains static for now.

## Consequences

**Positive**

- Inquiries are durably stored in a managed Postgres instance with minimal operational overhead.
- The rest of the site remains statically generated and fast.
- Validation and security patterns (Zod, server-side insertion) align with project skills.

**Negative**

- Requires managing Supabase project credentials in each environment.
- The inquiry feature depends on an external service; local development needs env vars configured, or the API will return a 503.

