# Performance Optimization

## Context Window Management

Keep tasks focused:
- Large-scale refactoring: break into small, independent PRs
- Feature implementation spanning multiple files: plan first
- Debugging complex interactions: isolate to a single area

Lower context sensitivity tasks:
- Single-file edits
- Independent utility creation
- Documentation updates
- Simple bug fixes

## React & Next.js Performance

- Use `useMemo` for expensive computations that depend on specific values
- Use `useCallback` for functions passed as props to child components
- Use `React.memo` for pure components that render frequently
- Lazy load heavy components with `lazy` + `Suspense`
- Prefer Server Components for data fetching; minimize client components

## Database Performance

- Select only required columns (avoid `SELECT *`)
- Avoid N+1 queries — batch with joins or `Promise.all`
- Use database indexes on frequently queried columns
- Use pagination for list endpoints (never return unbounded datasets)
- Cache repeated reads with appropriate TTL

## Build Troubleshooting

If build fails:
1. Analyze error messages carefully
2. Fix incrementally
3. Verify after each fix
4. Use the **verification-loop** skill to run a full quality check
