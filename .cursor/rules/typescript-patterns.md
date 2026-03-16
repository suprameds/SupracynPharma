---
paths:
 - "**/*.ts"
 - "**/*.tsx"
 - "**/*.js"
 - "**/*.jsx"
---
# TypeScript/JavaScript Patterns

## API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}
```

## Custom Hooks Pattern

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

## Repository Pattern

```typescript
interface Repository<T> {
  findAll(filters?: Filters): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDto): Promise<T>
  update(id: string, data: UpdateDto): Promise<T>
  delete(id: string): Promise<void>
}
```

## Key Rules

- Always use explicit TypeScript types — avoid `any`
- Use `interface` for object shapes, `type` for unions/aliases
- Use `const` by default; only use `let` when reassignment is needed
- Use optional chaining (`?.`) and nullish coalescing (`??`) over manual null checks
- Prefer `async/await` over `.then()` chains for clarity
- Use Zod for runtime validation at API boundaries
