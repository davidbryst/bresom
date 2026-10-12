# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Portfolio of David Abraham (full-stack developer & UI/UX designer, Abidjan), live at https://bresom.vercel.app.
"Lite" build — an editorial "Studio" look: vermilion accent on bone paper, oversized display type, mono labels, hard offset shadows. CSS-first motion, no animation library.

## Stack

- Remix 2.16.7 + Vite 6, Vercel preset (`@vercel/remix`)
- React 18, TypeScript (strict), path alias `~/*` → `app/*`
- Tailwind CSS 3.4 (+ `app/styles/lite.css` for the theme)
- Resend for the contact form, `sanitize-html` for input cleaning
- `@react-pdf/renderer` only for the legacy `/yscv.pdf` route
- Icons: `lucide-react`

Node 22.x.

## Commands

```bash
npm run dev        # dev server (needs RESEND_API_KEY to load the contact route)
npm run typecheck
npm run lint
npm run build
npm run optimize:images   # scripts/optimize-images.mjs (sharp)
```

## Structure

- `app/routes/_index.tsx` — home: Header, Hero, Work, About, Services (offers), Skills, Experience, Contact, Footer, CV FAB, theme switcher
- `app/routes/projets.$slug.tsx` — project detail page (gallery + lightbox, related, prev/next)
- `app/routes/api.contact.tsx` — contact form action (rate limit, honeypot, sanitize, Resend)
- `app/routes/sitemap[.]xml.tsx` — sitemap from `projectsData`
- `app/routes/yscv[.]pdf.tsx` + `app/data/cvContent.ts` — legacy generated CV, kept on purpose
- `public/cv.pdf` — the current CV (static file, served at `/cv.pdf`)
- `app/components/lite/*` — all UI components
- `app/data/content.ts` — **all content** (hero, about, offers, projects, experience, skills, contact). Edit here, not in components.
- `audits/` — audit reports (`/audit-complet`), one file per run

## Design system

Tokens live in `app/styles/lite.css` (CSS variables) and are mirrored in `tailwind.config.ts`:

- `ink` #0E0E0E, `paper` #F2EEE6, `bone` #E7E0D2, `cobalt`, `forest`
- `vermilion` = runtime accent `rgb(var(--accent-rgb))`, changed by `LiteThemeSwitcher` and persisted in localStorage (applied before paint by an inline script in `root.tsx`)
- `accent-text` = `var(--accent-text)`, a darker accent **for small text** (≥ 4.5:1 on paper). Use `text-vermilion` only for large display numbers, fills and shadows.
- Fonts: Syne (`font-display` / `.lite-display`), Hanken Grotesk (body), JetBrains Mono (`font-mono` labels)
- Easing: `ease-lite` = cubic-bezier(0.16, 1, 0.3, 1)

Rules:
- Square corners, 1–2 px ink borders, offset shadows (`shadow-[4px_4px_0_0_…]`).
- Small text on paper: `text-ink/60` minimum. Small text on ink: `text-paper/60` minimum.
- Text on a vermilion fill: `text-ink`, not white.
- Focus: the global `:focus-visible` outline in `lite.css` — don't remove outlines.

## Motion

- Hero entrance: CSS `.lite-rise` keyframes.
- Scroll reveal: `Reveal` (one IntersectionObserver per element). Elements are only hidden when JS runs (`html.js`), so content stays visible without JS.
- `prefers-reduced-motion` is handled in `lite.css` (rise/reveal/marquee/ping/cycle off).

## Touch / mobile

- Global haptic feedback on links and buttons (`Haptics.tsx`): Vibration API on Android, hidden `<input switch>` trick on iOS Safari 18+.
- Floating CV button (`LiteCvFab`) bottom-left on < lg, theme switcher bottom-right.
- `tailwind.css` forces 44 px min touch targets on ≤ 768 px.

## Contact form

POST `/api/contact` via `useFetcher`. Sends with Resend from `contactConfig.from` to `contactConfig.email` (`app/data/content.ts`). `onboarding@resend.dev` can only deliver to the Resend account's own email — use a verified domain for real delivery. A hidden `website` field is a honeypot: filled → silently accepted, not sent.

## Images

Project images in `public/projet/<slug>/` as WebP, referenced in `content.ts` as `/<slug>/<file>.webp` (the `/projet` prefix is added by `imgPath`). Keep gallery images ≤ 1200 px wide.
