## Bresom Lite — conventions

This is the "Studio / Editorial" palette of David Abraham's portfolio (Remix +
Tailwind). Components are self-contained page sections: most take **no
props** — they read their own content from an internal data module, so
composing them is just `<LiteHero />`, `<LiteWork />`, etc.

### Setup

No provider or wrapper is required — none of these components read from
React context. Drop them directly into a page. Two runtime details worth
knowing:

- The accent color is driven by one CSS custom property, `--accent-rgb`
  (default `255 59 18`, the vermilion seen in the previews). Every
  `vermilion` utility resolves through it — override it on `:root` or a
  wrapper to re-tint the whole system in one line: `style={{ '--accent-rgb':
  '43 68 255' }}` (Tailwind's `vermilion` color is literally
  `rgb(var(--accent-rgb) / <alpha-value>)`).
- `LiteHeader` and `LiteThemeSwitcher` are `position: fixed` (top bar /
  bottom-right floating widget) — they anchor to the viewport, not to their
  DOM parent. Place them once, near the root of a page.

### Styling idiom — Tailwind, with a real brand-color family

No CSS classes are invented — everything is a standard Tailwind utility
against custom tokens defined in `tailwind.config`. The brand family (use
these, not arbitrary hex):

| Token | Utility examples | Use |
|---|---|---|
| `ink` (`#0E0E0E`) | `bg-ink`, `text-ink`, `border-ink` | primary text / dark surfaces |
| `paper` (`#F2EEE6`) | `bg-paper`, `text-paper`, `border-paper` | primary background (warm off-white) |
| `bone` (`#E7E0D2`) | `bg-bone` | secondary/muted surface |
| `vermilion` (dynamic, `--accent-rgb`) | `bg-vermilion`, `text-vermilion` | the ONE accent — CTAs, highlights, active states |
| `cobalt`, `forest` | `bg-cobalt`, `text-forest` | secondary accents (project tags, status dots) |

Opacity modifiers compose normally: `text-ink/70`, `border-ink/25`.

Type is three families, each with its own utility — never mix them in:
- `font-display` → **Syne** (headlines, big numerals — bold/editorial)
- `font-body` → **Hanken Grotesk** (default body copy)
- `font-mono` → **JetBrains Mono** (eyebrow labels, meta text, uppercase + tracked)

A handful of hand-written utility classes carry the "editorial" texture and
aren't Tailwind-generated — reuse them rather than approximating with raw
CSS: `.lite-display` (display headline sizing/leading), `.lite-mono` (tracked
mono label), `.lite-link` (underline-on-hover link), `.lite-reveal` +
`.is-visible` (scroll-fade, toggled by the `Reveal` component — don't apply
by hand), `.lite-rise`, `.lite-marquee` / `.lite-marquee-wrap` /
`.lite-marquee--reverse`, `.lite-skillbar`, `.lite-grain`, `.lite-grid-rules`.

### Where the truth lives

Read `styles.css` (and its one `@import`, `_ds_bundle.css`) before styling —
it's the full compiled Tailwind output plus every `.lite-*` class and the
`:root` custom properties, so any class or token named above (and any not
listed here) can be confirmed there directly. Per-component usage notes are
in each `components/general/<Name>/<Name>.prompt.md`.

### Example

```jsx
<>
  <LiteHeader />
  <main>
    <LiteHero />
    <LiteWork />
    <LiteSkills />
  </main>
  <LiteFooter />
  <LiteThemeSwitcher />
</>
```

A layout built in this system's own idiom (no component from the library —
composition glue only):

```jsx
<section className="bg-paper border-t border-ink/35 py-20 px-5 md:px-10">
  <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
    (02) — À propos
  </span>
  <h2 className="lite-display text-ink mt-4">Titre de section</h2>
  <p className="font-body text-ink/80 mt-4 max-w-xl">Corps de texte.</p>
  <button className="bg-vermilion text-white font-mono text-sm uppercase tracking-[0.14em] px-7 py-4">
    Call to action
  </button>
</section>
```
