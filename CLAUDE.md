# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack, outputs to .next/dev)
npm run build    # Production build (Turbopack by default); also the main type-check
npm run start    # Start production server
npx tsc --noEmit # Type-check only
```

No linter and no tests are set up. ESLint is not installed and there is no `eslint.config.mjs`. `next lint` was removed in Next.js 16, so linting would mean adding ESLint (Flat Config) first.

## Architecture

This is a learning project: an X/Twitter clone built with **Next.js 16** App Router, React 19, TypeScript (strict) and Tailwind CSS v4. Settings in `next.config.ts`:
- `reactCompiler: true`: components are memoized automatically, so don't add `useMemo`/`useCallback`/`memo` by hand.
- `typedRoutes: true`: `<Link href>` and router calls are checked against the real routes. Build URLs with the `PAGES` helpers in `src/config/pages.config.ts` instead of writing path strings by hand.
- `logging.serverFunctions` and `logging.fetches.fullUrl` make the dev server log Server Action calls and fetch URLs.

Imports use the `@/*` alias for `src/*`. `verbatimModuleSyntax` is on, so type-only imports must use `import type`.

### Routing
- `src/app/layout.tsx` is the root layout (Inter font as `--font-inter`, global CSS).
- `src/app/(public)/` is a route group. Its `layout.tsx` renders `<Header>` above every public page.
  - `(home)/` is a nested group that serves `/`. Components used only by a route sit next to its `page.tsx` (for example `Tweet.tsx` and `TweetForm.tsx`).
  - `explore/`, `about/`, and `u/[username]/` (profile page).
- `src/app/not-found.tsx` is the global 404 page.
- `src/proxy.ts` is a placeholder proxy (it just calls `NextResponse.next()`). It replaces the old `middleware.ts`, which has been deleted.

When you add a page, also add it to `PAGES` (`src/config/pages.config.ts`). If it belongs in the nav, add it to `MENU` (`src/components/menu.data.ts`). `Menu.tsx` marks the active link by matching `usePathname()` against each `href` with `path-to-regexp`'s `match`.

### Data flow (no database)
- `src/shared/data/tweets.data.ts` (`TWEETS`) and `profiles.data.ts` (`PROFILES`, keyed by username) are in-memory arrays and objects acting as a fake backend. Types are in `src/shared/types/`.
- Writes go through Server Actions in `src/server-actions/`. For example, `postTweet` checks the length (280 characters max), runs `TWEETS.unshift(...)` on the module-level array, then calls `revalidatePath(PAGES.HOME)`. These changes last only for the life of the server process.
- `TweetForm` is a client component. It calls the action inside `useTransition` through `<form action>`.
- Read data only in server components (`page.tsx`) and pass it to children as props. If a `'use client'` file imports `TWEETS`/`PROFILES`, the browser gets a frozen copy of the data and never sees new posts. For example, `u/[username]/page.tsx` looks up the profile (unknown user → `notFound()`) and passes it to `Profile`. `explore/page.tsx` reads `searchParams.tag` to filter the posts.

### Styling
Tailwind v4 is configured through CSS (`@import "tailwindcss"` and `@theme inline` in `globals.css`), so there is no `tailwind.config`. The UI is a dark, X-style look built from `white/NN` opacity utilities.

## Next.js 16 Breaking Changes

This version has significant breaking changes from earlier Next.js. **Always read `node_modules/next/dist/docs/` before writing code involving these APIs.**

### Async Request APIs (fully async — no synchronous fallback)
`cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are all Promises. Always `await` them:

```ts
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

Use `npx next typegen` to generate `PageProps`, `LayoutProps`, and `RouteContext` helpers.

### Proxy replaces Middleware
`middleware.ts` is deprecated. Use `proxy.ts` with a named export `proxy`. Config flag renamed: `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.

### Caching APIs
- `unstable_cacheLife` / `unstable_cacheTag` → now stable as `cacheLife` / `cacheTag`
- `revalidateTag('tag')` now requires a second `cacheLife` profile argument: `revalidateTag('tag', 'max')`
- New `updateTag` (Server Actions only) for immediate read-your-writes cache expiry
- New `refresh()` from `next/cache` to refresh the client router from a Server Action
- PPR: `experimental.ppr` is removed; use top-level `cacheComponents: true` instead

### Other removals/renames
- `next build` no longer lints
- `serverRuntimeConfig` / `publicRuntimeConfig` removed — use `process.env` / `NEXT_PUBLIC_` vars
- `experimental.turbopack` moved to top-level `turbopack` in `next.config.ts`
- `experimental.dynamicIO` renamed to `cacheComponents`
- AMP support fully removed
- `next/legacy/image` deprecated — use `next/image`
- `images.domains` deprecated — use `images.remotePatterns`
- Parallel route slots all require explicit `default.js` files (build fails without them)
- `devIndicators` options `appIsrStatus`, `buildActivity`, `buildActivityPosition` removed
