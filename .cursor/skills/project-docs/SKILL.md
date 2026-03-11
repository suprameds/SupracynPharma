---
name: project-docs
description: Documentation and communication practices for this project, including README, ADRs, API docs, and code comments. Use when updating docs, explaining changes, or improving onboarding and developer experience.
---

# Project Documentation & Communication (SupracynPharma)

## When to Apply This Skill

Use this skill whenever you:

- Update or create `README`, onboarding, or usage docs.
- Make architectural or tooling decisions that deserve an ADR.
- Design or change APIs that should be documented.
- Add or refine code comments for complex logic.

## README & Onboarding

For the main project README:

- Include at least:
  - Project **title** and short description.
  - **Prerequisites** (Node version, package manager, required services).
  - **Installation** and setup steps.
  - How to **run** the app (dev and production).
  - How to run **tests** and **linting**.
  - Links to contributing guide and license (if applicable).
- Keep examples minimal but accurate; update them when flows change.
- For UI features, prefer a small screenshot or GIF over long prose.

For onboarding docs:

- Clarify the high-level architecture (frontend, APIs, data sources).
- Document common commands (`dev`, `build`, `test`, `lint`).
- Link out to any ADRs or API docs for deeper details (for example, `docs/adr/0001-supabase-for-inquiries.md` for the inquiry backend).

## Architectural Decision Records (ADRs)

Use ADRs for **significant, non-trivial decisions**:

- Framework/library choices (auth, state, testing, data fetching).
- Data model or API design choices with long-term impact.
- Patterns that diverge from the defaults and might surprise newcomers.

Storage and naming:

- Place ADRs under `docs/adr/` using sequential numbering: `0001-title.md`.

Template:

- Include:
  - Title with ID and decision summary.
  - Date and status (`Proposed`, `Accepted`, `Superseded`, etc.).
  - Context (problem and constraints).
  - Decision (what was chosen).
  - Consequences (positive and negative).

Rules:

- Do not delete old ADRs; create a new one and mark the old as `Superseded` when decisions change.
- Keep tone objective and focused on trade-offs, not personal preferences.

## API Documentation

For any non-trivial API surface (internal or external):

- Document:
  - **Authentication** requirements (Bearer token, cookies, roles).
  - Endpoint **method and path**.
  - Request **parameters** and **body** shapes.
  - Response formats, including typical error structures.
- Provide at least one concrete **request and response example** (JSON).
- Keep docs close to the implementation:
  - Either via OpenAPI/Swagger where appropriate.
  - Or via markdown in a clear location (e.g., `docs/api/*.md`).

If the API is used by other teams or clients, treat documentation as part of the contract and keep it updated with any breaking changes.

## Code Comments

When adding comments:

- Explain **why** something is done a certain way, not what each line does.
- Call out:
  - Non-obvious invariants or assumptions.
  - Workarounds for external limitations or bugs.
  - Performance or security-sensitive sections.
- Keep comments in sync with the code; remove stale or misleading comments.

Avoid:

- Redundant comments that restate obvious code behavior.
- Large comment blocks where a small refactor or better naming would be clearer.

## Output Expectations

When this skill is applied:

- New contributors can understand and run the project quickly.
- Important decisions are captured and searchable via ADRs.
- APIs are discoverable and consumable with minimal guesswork.
- Comments and docs stay concise, focused on intent and trade-offs.

