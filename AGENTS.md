# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Supracyn Pharma is a Next.js 16 App Router corporate marketing website (TypeScript, Tailwind CSS v4, Framer Motion). All product/blog/therapy data is static (`src/data/*.ts`). The only dynamic feature is a contact inquiry form backed by Supabase (optional).

### Prerequisites

- **Node 20** (matches CI). Set via `nvm use 20` or `nvm alias default 20`.
- **npm** is the package manager (`package-lock.json`).
- `ts-node` must be installed for Jest to load `jest.config.mts`. It is an optional peer dep of `ts-jest` not listed in `package.json`; the update script installs it with `--no-save`.

### Running the app

- `npm run dev` starts the Next.js dev server on port 3000.
- No Docker, no external databases, no containers required.
- Supabase env vars (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are optional; without them the inquiry API returns `{"ok":true}` (graceful fallback) and all pages render normally.

### Key commands

See `package.json` scripts: `dev`, `build`, `lint`, `type-check`, `test`, `test:coverage`.

### Known issues

1. **Jest config auto-discovery**: Jest 29.7.0 does not auto-discover `.mts` config files. A symlink `jest.config.ts → jest.config.mts` is created by the update script as a workaround.
2. **Jest `fetch` in jsdom**: The test suite uses `jest.spyOn(global, "fetch")` but `jest-environment-jsdom` 29.7.0 does not provide a global `fetch`. Tests fail with "Property `fetch` does not exist". This is a pre-existing repo issue.
