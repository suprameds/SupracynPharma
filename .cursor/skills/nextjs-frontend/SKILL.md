---
name: nextjs-frontend
description: Opinionated Next.js App Router, React component, form, and accessibility best practices for this project. Use when editing files in src/app, React components, or UI logic to ensure pro-level UX, performance, and a11y.
---

# Next.js Frontend Guidelines (SupracynPharma)

## When to Apply This Skill

Use this skill whenever:

- Working in `src/app` or any React component/page.
- Adding or changing routes, layouts, or data fetching.
- Implementing or refactoring forms.
- Touching UI that affects performance or accessibility.

## Core Principles

1. Prefer **Server Components** for data fetching and static UI.
2. Use **Client Components** only when you need interactivity, hooks, or browser APIs.
3. Keep components **small, focused, and memo-friendly**.
4. Make UI **accessible by default** and verify with tooling.

## Routing & App Router

- Place routes under `app/`:
  - `app/page.tsx` → `/`
  - `app/products/[id]/page.tsx` → `/products/:id`
- Use `layout.tsx` for shared shells (navigation, footer, providers).
- Prefer **async server components** for route `page.tsx` files:
  - Fetch data directly (DB or HTTP) in the page component.
  - Avoid fetching the same data again on the client.

### Data Fetching Patterns

- **Static (default)**: Use plain `fetch` or `cache: 'force-cache'` for content that rarely changes.
- **Dynamic**: Use `fetch(..., { cache: 'no-store' })` for highly dynamic data.
- **ISR**: Use `next: { revalidate: seconds }` to revalidate periodically.
- Keep data fetching **close to the route**; avoid deep prop-drilling when a server component can read directly.

## Client Components & Optimization

Use `'use client'` **only** when:

- You need React hooks (`useState`, `useEffect`, `useContext`).
- You handle user interactions (clicks, typing, drag/drop).
- You use browser-only APIs (`window`, `document`, `localStorage`).

When working in a client component:

1. **Identify bottlenecks**:
   - Lists, tables, filters, and any component that re-renders frequently.
2. **Apply memoization where it matters**:
   - Wrap pure presentational components with `React.memo`.
   - Memoize callbacks with `useCallback` when passing them to children.
   - Memoize expensive derived data with `useMemo`.
3. **Large lists**:
   - For long product or therapy lists, prefer virtualization libraries instead of rendering hundreds of rows at once.

Avoid:

- Over-memoizing everything by default.
- Passing new object/array literals to memoized children on every render (wrap in `useMemo` first).

## Forms (React Hook Form + Zod)

When implementing or refactoring forms:

- Use **React Hook Form** for form state.
- Use **Zod** for schema validation and infer TypeScript types from schemas.

Checklist:

1. Initialize with `useForm` and destructure `register`, `handleSubmit`, `control`, and `formState`.
2. Use `register` for basic inputs; use `Controller` for 3rd-party components.
3. Move validation rules into a Zod schema and plug it via `@hookform/resolvers`.
4. Display validation errors close to the relevant field.
5. Keep form components client-side, but consider server actions or API routes for submission logic.

Constraints:

- Do not mix uncontrolled and controlled patterns manually; let React Hook Form own the inputs.
- Validate on both client (for UX) and server (for security).

## Accessibility (a11y) Expectations

For every UI change:

- Use **semantic HTML** (`button`, `nav`, `main`, `header`, `footer`) instead of generic `div`s.
- Ensure **keyboard navigation** works:
  - All interactive elements are focusable.
  - No custom clickable `div`s without proper roles and key handlers.
- Provide **clear labels**:
  - Inputs should have associated labels or `aria-label`.
  - Icon-only buttons need text for screen readers.
- Maintain **color contrast** that meets WCAG AA.
- Add `alt` text for meaningful images; use empty `alt` only for decorative ones.

Tooling:

- Rely on `eslint-plugin-jsx-a11y` (if available) and fix reported issues.
- Optionally run Lighthouse or other audits on significant pages before releases.

## Output Expectations

When this skill is applied, aim for:

- Clean, idiomatic Next.js App Router usage.
- Minimal client-side JavaScript for static pages.
- React components that re-render only when needed.
- Forms that are performant, validated, and accessible.
- UI that passes basic a11y checks without regressions.

