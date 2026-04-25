# Agent Guidance

This repo is a SvelteKit app using Svelte 5, TypeScript, Tailwind, and PocketBase. For Svelte and SvelteKit API details, consult `docs/agent/svelte-llms-small.txt`.

Source for the vendored Svelte reference:
https://svelte.dev/llms-small.txt

Fetched: 2026-04-25

## Core Standards

- Use Svelte 5 syntax and runes. Prefer `$state`, `$derived`, `$effect`, `$props`, and `$bindable` over Svelte 4 patterns.
- Keep server-only logic in server-only files or `$lib/server`. Do not import server-only code into browser components.
- Prefer typed code. Use generated PocketBase types from `src/lib/pocketbase-types.ts` and app-specific expanded types from `src/lib/expanded-models.ts`.
- Do not branch app behavior on display text when a stable identifier can be used. For map layers, prefer a shared layer registry or typed helper over repeated `layer.name.startsWith(...)` checks.
- Keep components focused. Split dialog shells, layer renderers, marker icons, and long-form content when a component starts owning several concerns.
- Do not change `package-lock.json` unless dependencies actually changed.

## File Structure And Naming

- Use PascalCase for Svelte components, kebab-case for non-component route folders, and descriptive camelCase for local variables and functions.
- Keep generic UI primitives in `src/lib/components/ui`, layout chrome in `src/lib/components/layout`, map-specific components in `src/lib/components/map`, and route-only UI near its route.
- Put shared domain utilities in `src/lib`. Put server-only helpers in `src/lib/server`.
- Prefer `index.ts` barrel files only for component folders that already use that pattern, such as `src/lib/components/ui`.
- Remove empty placeholder files instead of keeping them around for future use.

## Styling

- Prefer Tailwind utilities for one-off layout and component styling.
- If the same class group appears in several places, extract it into a small component or a named class in `src/app.css` under `@layer components`.
- Keep global CSS small and intentional. Use `src/app.css` for design tokens, base styles, reusable component classes, and truly shared utilities.
- Do not add component-specific global CSS unless there is a clear reuse case. Prefer local component structure first.
- Avoid inline `style` attributes except for dynamic values that cannot be expressed cleanly with classes.
- Avoid layout hacks such as invisible placeholder text. Use CSS layout constraints, shared components, or Tailwind utilities that describe the real layout.
- Keep styling consistent with the current app before introducing new visual systems.

## Map Layers

- When adding a map layer, update the layer selector, marker icon behavior, dialog content, and data loading in one coherent change.
- Prefer a central layer registry or helper functions for layer identification, icon selection, and dialog routing.
- Do not add more `layer.name.startsWith(...)` checks unless you are preserving existing behavior during a small scoped fix.
- Keep marker rendering separate from dialog content. A marker component should not need to know every detail of a layer's body content.
- Keep per-layer static lists, such as special icon names, outside dialog shells when they become more than a few entries.

## PocketBase

- Put reusable PocketBase URL/file helpers in shared modules instead of duplicating them across load functions.
- Return UI-ready data from server load functions rather than mutating raw PocketBase records throughout components.
- Keep `PUBLIC_POCKETBASE_URL` for browser-accessible file URLs and private `POCKETBASE_URL` for server-side SDK access.
- When the PocketBase schema changes, regenerate `src/lib/pocketbase-types.ts` and include that generated diff in the same PR.

## SvelteKit

- Fetch route data in `+page.server.ts` or `+page.ts`, not inside page components.
- Use `$lib` imports for shared app code.
- Keep route files focused on routing and data loading. Move reusable domain logic into `src/lib`.
- Address Svelte compiler warnings when touching nearby code, especially Svelte 5 state-capture warnings.

## Content And Assets

- Keep long-form static text out of complex interactive components when possible. Move it to a typed data module, markdown/content file, or PocketBase depending on who needs to edit it.
- Store public static assets in `static/` only when they should be served directly by URL.
- Use clear, lowercase, hyphenated asset names for new files.
- Document third-party asset sources and licensing near the asset or in the PR description.

## Git And PR Hygiene

- Keep changes scoped. Avoid mixing feature work, formatting sweeps, dependency updates, and generated type changes unless they are directly related.
- Do not rewrite student or teammate changes unless explicitly asked. Work with the current branch state.
- Prefer small commits with clear messages. Use conventional commit style when practical.
- Mention known warnings, skipped checks, schema assumptions, and PocketBase data dependencies in the PR notes.

## Verification

Before opening or updating a PR, run:

```bash
npm run check
npm run lint
npm run build
```

If a command cannot be run locally, mention that in the PR notes.
