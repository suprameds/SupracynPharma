# Global Engineering Rules

Stack:
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- Supabase
- PostgreSQL

Core rules:
1. Write production-ready code only.
2. Use TypeScript everywhere.
3. Prefer Server Components unless interactivity is required.
4. Validate every external input.
5. Never expose secrets or service-role keys.
6. Keep UI, data, and backend concerns separate.
7. Handle loading, empty, success, and error states.
8. Avoid unnecessary dependencies.
9. Keep files focused and reasonably small.
10. Prefer clarity over cleverness.

Architecture:
- shared types in `src/types`
- reusable services in `src/lib` or `src/server`
- route-level data loading kept close to the route
- business logic extracted from page files
- reusable validation schemas
- predictable API response shapes

Code style:
- descriptive names
- minimal but useful comments
- no dead code
- no console logs in production
- no silent failures

Security:
- use environment variables for secrets
- sanitize and validate input
- protect server actions and route handlers
- default to least privilege
- think about RLS for user-owned data

Quality bar:
- no broken types
- no lint errors
- no duplicated logic when avoidable
- strong accessibility defaults
- responsive UI
