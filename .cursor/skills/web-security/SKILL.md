---
name: web-security
description: Web security guidelines for this project, including XSS and CSRF protection, safe JWT usage, and Zod-based input validation. Use when working on APIs, forms, authentication, or anywhere user-controlled data is processed.
---

# Web Security Guidelines (SupracynPharma)

## When to Apply This Skill

Use this skill whenever:

- Adding or modifying API routes, server actions, or handlers.
- Handling user input (forms, query params, request bodies).
- Implementing or updating authentication and authorization logic.
- Rendering content that might include user-provided data.

## Core Principles

1. **Never trust client input** — always validate and sanitize on the server.
2. **Least privilege** — expose only what is needed, with role/permission checks at the boundary.
3. **Secure by default** — safe cookie settings, no inline scripts, and minimal attack surface.

## Input Validation (Zod)

When accepting any user data:

- Define a **Zod schema** describing the exact shape of the input.
- Infer a TypeScript type from that schema for handlers.
- Reject invalid data early with clear error responses.

Checklist:

- Use `z.object({...})` with specific field constraints (email, uuid, min/max length).
- Use `.strict()` or rely on default parsing to strip unknown fields.
- Do not process requests unless `.parse` / `.safeParse` succeeds.
- Return 400 with structured error details for invalid input.

Never rely solely on client-side validation; always enforce the schema on the server.

## XSS Protection

When rendering data:

- Treat all user-controlled data as untrusted.
- In React components, **avoid `dangerouslySetInnerHTML`** unless absolutely necessary.
- If HTML must be rendered, sanitize it first using a well-maintained library on the server.
- Do not expose raw HTML from APIs when plain text or structured JSON is sufficient.

Browser and server practices:

- Avoid using `innerHTML` in any client-side code; prefer `textContent` or JSX interpolation.
- Prefer `HttpOnly` cookies for sensitive data to prevent access via `document.cookie`.

## CSRF Protection

When using cookies for authentication or sessions:

- Set `SameSite` appropriately (`Lax` for most flows, `Strict` for very sensitive areas).
- Ensure `secure` and `httpOnly` are set for session/auth cookies in production.
- Do not perform state-changing operations (create/update/delete) with GET requests.

For forms or browser-based APIs:

- Consider CSRF tokens or double-submit cookie patterns when SameSite cookies are not sufficient or when supporting legacy browsers.
- Avoid overly permissive CORS (`Access-Control-Allow-Origin: *`) for authenticated endpoints.

## JWT Authentication & Secrets

When using JWTs:

- Keep payloads small (id, roles, essential flags).
- Use strong, random secrets stored in environment variables (never committed).
- Use short-lived access tokens and longer-lived refresh tokens if needed.
- Validate tokens on every protected request and handle failures with clear 401/403 responses.

Cookie vs header:

- Prefer `Authorization: Bearer <token>` headers for APIs, or secure `HttpOnly` cookies for browser sessions.
- Do not store tokens in `localStorage` for highly sensitive flows; consider cookie-based auth instead.

## Additional Hardening

- Use a **Content Security Policy (CSP)** to restrict script sources and block inline scripts where possible.
- Regularly scan dependencies for known vulnerabilities and apply updates.
- Avoid leaking implementation details (full stack traces, secret names) in error responses.

## Output Expectations

When this skill is applied, the resulting code should:

- Validate and sanitize all user input via schemas.
- Render untrusted data safely, with no obvious XSS vectors.
- Protect authenticated actions against CSRF.
- Handle JWTs, cookies, and secrets securely and consistently across the project.

