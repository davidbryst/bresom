import { useEffect, useState } from "react";

const NAV = [
  { label: "Travaux", href: "/#work" },
  { label: "À propos", href: "/#about" },
  { label: "Offres", href: "/#services" },
  { label: "Expertise", href: "/#skills" },
  { label: "Parcours", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function LiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
        open
          ? "bg-paper border-b border-ink/10"
          : scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex items-center justify-between gap-3 h-16 md:h-20">
          {/* Wordmark */}
          <a
            href="/#top"
            className="font-display font-extrabold text-vermilion p-3 text-lg tracking-tight leading-none"
          >
            DAVID<span className="text-vermilion">.</span>ABRAHAM
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="lite-link font-mono text-xs uppercase tracking-[0.18em] text-ink/70 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: status + CTA (desktop) / toggle (mobile) */}
          <div className="flex shrink-0 items-center gap-3 lg:gap-4">
            <span className="hidden xl:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-forest opacity-70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
              </span>
              Disponible
            </span>
            <a
              href="/cv.pdf"
              download="CV-David-Abraham.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 border border-ink/25 font-mono text-xs uppercase tracking-[0.16em] px-4 py-2.5 text-ink/80 hover:border-ink hover:text-ink transition-colors"
            >
              CV <span aria-hidden>↓</span>
            </a>
            <a
              href="/#contact"
              className="hidden lg:inline-block bg-ink text-paper font-mono text-xs uppercase tracking-[0.16em] px-5 py-2.5 hover:bg-vermilion transition-colors"
            >
              Me contacter
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col items-end gap-[5px] p-2 -mr-2"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <span
                className={`block h-[2px] bg-ink transition-all duration-300 ${
                  open ? "w-6 translate-y-[7px] rotate-45" : "w-6"
                }`}
              />
              <span
                className={`block h-[2px] bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-[2px] bg-ink transition-all duration-300 ${
                  open ? "w-6 -translate-y-[7px] -rotate-45" : "w-5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-paper z-[65] transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-5 pt-6">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-ink/10 py-5"
            >
              <span className="lite-display text-4xl">{item.label}</span>
              <span className="font-mono text-xs text-ink/60">0{i + 1}</span>
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-8 bg-vermilion text-ink text-center font-mono text-sm uppercase tracking-[0.16em] py-4"
          >
            Démarrer un projet
          </a>
          <a
            href="/cv.pdf"
              download="CV-David-Abraham.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 border border-ink/25 text-center font-mono text-sm uppercase tracking-[0.16em] py-4 text-ink hover:border-ink transition-colors"
          >
            Télécharger le CV <span aria-hidden>↓</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
