# Cursor Power Kit for Next.js

This kit is a stronger `.cursor` setup for:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase / PostgreSQL

## Includes
- 10 custom agents
- 24 reusable skills
- strong rules and project context
- MCP setup templates
- workflow docs

## Install
1. Unzip the archive.
2. Copy the `.cursor` folder into your project root.
3. Merge with any existing `.cursor` folder.
4. Restart Cursor.

## Folder layout
- `.cursor/agents` → specialized subagents
- `.cursor/skills` → reusable workflows
- `.cursor/mcp` → MCP templates
- `.cursor/rules.md` → global engineering rules
- `.cursor/context.md` → project context

## Example prompts
- Use `next-architect` to design a scalable dashboard structure.
- Use `db-agent` to model orders, customers, and prescriptions.
- Run `/build-feature` for a patient dashboard.
- Run `/fix-bug` for a hydration mismatch on the checkout page.

## Recommended daily workflow
1. Use `next-architect` for planning.
2. Use `db-agent` if schema changes are needed.
3. Use `api-backend-agent` or `data-fetching-agent` for server work.
4. Use `ui-builder` for interface work.
5. Use `qa-debug-agent` to verify and fix issues.
6. Use `perf-seo-agent` before release.
