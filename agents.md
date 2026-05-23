# Agents & Copilot Instructions — Sayantan Paul Portfolio v2

> This file instructs AI coding agents (GitHub Copilot, Claude, etc.) on project conventions,
> tech-stack decisions, and coding patterns to follow when generating or modifying code in this repository.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 (with `react-dom`) |
| Build tool | Vite 8 |
| Language | TypeScript 5.9 (strict mode) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` plugin |
| Package manager | Yarn 4 (Berry) |
| Deployment | `gh-pages` → `gh-pages` branch → GitHub Pages |

---

## Styling Rules — Tailwind CSS v4

- **Always use Tailwind utility classes** for all styling. Do NOT create `.css` files per component.
- Tailwind is loaded via a single `@import "tailwindcss";` in `src/index.css` — no `tailwind.config.js` needed (v4 uses CSS-first config).
- Use `@theme` blocks in `src/index.css` to define custom design tokens (colours, fonts, spacing) instead of inline arbitrary values.
- Use `data-[theme=dark]:` / `dark:` variants for theme switching — the `data-theme` attribute is toggled on `<html>` by `ThemeContext`.
- Prefer responsive variants (`sm:`, `md:`, `lg:`) over media query hacks.
- Compose complex reusable patterns with `@layer components { .btn { @apply ... } }` in `index.css` — not in separate files.
- **Never** use inline `style={{}}` for anything that can be expressed with a Tailwind class or a CSS custom property.

### CSS Custom Properties (design tokens)

Define tokens in `src/index.css` under `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-accent: #d4ff00;
  --color-accent-fg: #0a0a0a;
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --font-sans: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

Then reference them as Tailwind classes: `bg-bg`, `text-accent`, `font-mono`, etc.

---

## Project Structure

```
src/
  main.tsx              # App entry — renders <StrictMode><App/></StrictMode>
  App.tsx               # Root component — wraps providers, renders sections
  index.css             # Global styles + Tailwind entry + @theme tokens

  components/           # One file per UI section/component (no sub-folders unless complex)
  constants/
    content.ts          # All hardcoded text, data arrays, and site metadata
    theme.ts            # ThemeTokens type + dark/light token maps
  context/
    ThemeContext.tsx     # Theme provider + useTheme() hook
    TransitionContext.tsx # Page-transition provider + usePageTransition() hook
  hooks/
    useReveal.ts        # IntersectionObserver-based scroll-reveal hook
    useScrollTransition.ts # Wheel/touch driven section-to-section navigation
  types/                # .d.ts module augmentations and shared type aliases
  utils/                # Pure helper functions (no React imports)
  assets/               # Bundled static assets imported in components (SVGs, etc.)

public/
  favicon.svg
  images/               # Static images referenced by URL (not imported)

v1/                     # Archived original vanilla-JS website — reference only, do not modify
```

---

## Component Conventions

- **One component per file.** File name matches the component name (PascalCase).
- Components are plain `.tsx` — **no** co-located `.css` files (use Tailwind).
- Export components as **named exports** at the bottom of the file, default export for the component itself.
- Keep component files focused: extract logic into hooks under `src/hooks/`.
- Sections of the page are `<section id="sectionName">` elements for scroll-navigation compatibility.

```tsx
// Good
export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center bg-bg">
      ...
    </section>
  )
}
```

---

## TypeScript Rules

- **Strict mode is on** — no `any`, no unused variables, no implicit `any`.
- Use `type` imports (`import type { Foo } from '...'`) for type-only imports.
- Prefer `interface` for object shapes that may be extended; `type` for unions and aliases.
- All component props must be explicitly typed.
- Use `as const` on static data objects in `constants/content.ts`.

---

## Context Usage

- `ThemeContext` — provides `theme: 'dark' | 'light'` and `toggleTheme()`. Reads/writes `data-theme` on `<html>` and `localStorage`.
- `TransitionContext` — provides `navigate(href, label?)` and `phase`. Drives page-transition overlay animations.
- Wrap the app with both providers in `App.tsx`:

```tsx
<ThemeProvider>
  <PageTransitionProvider>
    ...
  </PageTransitionProvider>
</ThemeProvider>
```

---

## Content Management

- **All user-facing text lives in `src/constants/content.ts`** — never hardcode strings directly in components.
- Section data (jobs, projects, skills) should be typed arrays exported from `content.ts`.
- Images in `public/images/` are referenced as `/images/filename.ext` (absolute path from root).

---

## Deployment

```bash
yarn deploy          # builds + pushes dist/ to the gh-pages branch
yarn dev             # local dev server at http://localhost:5173
yarn build           # production build to dist/
yarn preview         # preview the production build locally
```

- The `base` in `vite.config.ts` is `'/'` (user page at root domain — no sub-path needed).
- GitHub Pages is configured to serve from the `gh-pages` branch.
- The `main` branch holds source code only — never commit `dist/` to main.

---

## Do NOT

- Do not add per-component `.css` files — use Tailwind.
- Do not use `styled-components`, `emotion`, CSS Modules, or any other CSS-in-JS solution.
- Do not add `tailwind.config.js` — v4 is configured entirely in CSS via `@theme`.
- Do not import images with `import img from './img.png'` unless required for bundling; prefer `/images/` public path.
- Do not commit `node_modules/`, `dist/`, or `.yarn/cache/` to the `main` branch.
- Do not hardcode text content in component files.
- Do not use `React.FC` — type props directly.
- Do not reference or modify the `v1/` folder during development.
