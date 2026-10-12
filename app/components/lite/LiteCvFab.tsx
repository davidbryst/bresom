// Floating "CV" button for mobile/tablet — the header CV link is desktop-only.
// Sits bottom-left so it never collides with the theme switcher (bottom-right).
export default function LiteCvFab() {
  return (
    <a
      href="/cv.pdf"
      download="CV-David-Abraham.pdf"
      aria-label="Télécharger le CV de David Abraham"
      className="lg:hidden fixed bottom-5 left-5 z-[70] print:hidden inline-flex items-center gap-2 bg-ink text-paper border border-paper/40 font-mono text-xs font-semibold uppercase tracking-[0.16em] px-4 py-3.5 shadow-[4px_4px_0_0_rgb(var(--accent-rgb))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform"
    >
      CV <span aria-hidden>↓</span>
    </a>
  );
}
