---
name: testing-react-next
description: Testing strategy for this project using Jest, React Testing Library, and Playwright-style E2E tests. Use when adding or modifying tests for React components, Next.js routes, or critical user flows.
---

# Testing Guidelines (React + Next.js)

## When to Apply This Skill

Use this skill whenever:

- Implementing new business logic or UI features.
- Fixing a bug (add or update a test that would have caught it).
- Refactoring components, hooks, or API logic.
- Verifying critical end-to-end flows.

## Testing Pyramid for This Project

1. **Unit tests (Jest)** — functions, hooks, and small modules.
2. **Component tests (React Testing Library)** — React components and pages.
3. **E2E tests (Playwright-style)** — high-value user journeys.

Bias towards more unit/component tests and a focused set of stable E2E tests.

## Unit Tests (Jest)

Use Jest for:

- Pure functions (formatters, calculators, mappers).
- Hooks or services with limited dependencies.

Checklist:

- Keep tests **isolated**; mock external systems (DB, network, file system).
- Use descriptive `describe` and `it` names that explain behavior and edge cases.
- Prefer `async/await` for async tests; assert with `resolves` / `rejects` as needed.
- Run with coverage periodically to ensure key modules are exercised.

Constraints:

- No real external calls; all I/O is mocked.
- Tests should be fast and stable; avoid time-based flakiness.

## Component Tests (React Testing Library)

Use React Testing Library for:

- Components and Next.js pages in `src/app`.
- Verifying user-visible behavior (text, buttons, forms) rather than implementation details.

Checklist:

- Render components with realistic props and providers (theme, router, query client) as needed.
- Query by **role**, **label**, or visible text rather than internal CSS classes.
- Simulate user behavior (`click`, `type`, `tab`) instead of calling component methods directly.
- Assert on the final UI state (what the user sees), not on internal state.

Constraints:

- Avoid brittle selectors; prefer accessible queries (e.g., `getByRole`, `getByLabelText`).
- Avoid testing styles or layout unless essential; focus on behavior and accessibility.

## End-to-End Tests (Playwright-Style)

Use E2E tests for:

- Login, registration, and authentication flows.
- Critical product/therapy-area journeys and forms.
- Flows that cross multiple pages and backends.

Checklist:

- Write tests that follow a clear Arrange / Act / Assert structure.
- Prefer accessibility-friendly selectors (`getByRole`, `getByLabel`, `data-testid`) over brittle DOM queries.
- Keep each test independent; reset or seed test data in `beforeEach` or fixtures.
- Run E2E tests in headless mode in CI and optionally with a UI when debugging locally.

Constraints:

- Avoid arbitrary static waits; rely on built-in waiting for elements and URLs.
- Limit E2E tests to the most valuable flows to keep the suite fast and maintainable.

## Output Expectations

When this skill is applied, the testing changes should:

- Increase coverage for important logic and UI, especially around bugs and new features.
- Use Jest, React Testing Library, and E2E tools in a consistent, idiomatic way.
- Produce fast, deterministic tests that give confidence when refactoring or deploying.

