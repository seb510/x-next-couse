# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack, outputs to .next/dev)
npm run build    # Production build (Turbopack by default)
npm run start    # Start production server
```

There is no `lint` script configured. To lint, run `npx eslint` directly (ESLint Flat Config format — use `eslint.config.mjs`, not `.eslintrc`).

There are no tests configured in this project.

## Architecture

This is a **Next.js 16** App Router project using TypeScript and Tailwind CSS v4. The React Compiler is enabled (`reactCompiler: true` in `next.config.ts`), which auto-memoizes components.

Entry points:
- `src/app/layout.tsx` — root layout (sets Geist fonts, html/body structure)
- `src/app/page.tsx` — home page route (`/`)
- `src/app/globals.css` — global styles (Tailwind)

## Next.js 16 Breaking Changes

This version has significant breaking changes from earlier Next.js. **Always read `node_modules/next/dist/docs/` before writing code involving these APIs.**

### Async Request APIs (fully async — no synchronous fallback)
`cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are all Promises. Always `await` them:

```ts
// page.tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const searchParams = await props.searchParams
}
```

Use `npx next typegen` to generate `PageProps`, `LayoutProps`, and `RouteContext` helpers.

### Proxy replaces Middleware
`middleware.ts` is deprecated. Use `proxy.ts` with a named export `proxy` (not `middleware`):

```ts
// proxy.ts
export function proxy(request: Request) {}
```

Config flags also renamed: `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.

### Caching APIs
- `unstable_cacheLife` / `unstable_cacheTag` → now stable as `cacheLife` / `cacheTag`
- `revalidateTag('tag')` now requires a second `cacheLife` profile argument: `revalidateTag('tag', 'max')`
- New `updateTag` (Server Actions only) for immediate read-your-writes cache expiry
- New `refresh()` from `next/cache` to refresh the client router from a Server Action
- PPR: `experimental.ppr` is removed; use top-level `cacheComponents: true` instead

### Other removals/renames
- `next lint` command removed — run `eslint` directly; `next build` no longer lints
- `serverRuntimeConfig` / `publicRuntimeConfig` removed — use `process.env` / `NEXT_PUBLIC_` vars
- `experimental.turbopack` moved to top-level `turbopack` in `next.config.ts`
- `experimental.dynamicIO` renamed to `cacheComponents`
- AMP support fully removed
- `next/legacy/image` deprecated — use `next/image`
- `images.domains` deprecated — use `images.remotePatterns`
- Parallel route slots all require explicit `default.js` files (build fails without them)
- `devIndicators` options `appIsrStatus`, `buildActivity`, `buildActivityPosition` removed
- `next dev` outputs to `.next/dev`; production build still uses `.next`
