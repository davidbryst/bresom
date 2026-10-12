import { heroData, aboutData, contactData, projectsData } from "~/data/content";

const MARQUEE = [
  "FLUTTER",
  "REACT",
  "NEXT.JS",
  "LARAVEL",
  "SUPABASE",
  "FIGMA",
  "DOCKER",
  "TYPESCRIPT",
  "PAIEMENT MOBILE",
  "UI/UX",
];

const STATS = [
  {
    value: aboutData.experience.replace(" ans", ""),
    label: "Années d'expérience",
  },
  {
    value: String(projectsData.length).padStart(2, "0"),
    label: "Projets présentés",
  },
  { value: "04", label: "Entreprises" },
  { value: "100%", label: "Sur‑mesure" },
];

export default function LiteHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 sm:pt-28 md:pt-36 pb-0"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        {/* Top coordinates */}
        <div
          className="lite-rise flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80 border-t border-ink/35 pt-4"
          style={{ animationDelay: "0.05s" }}
        >
          <span>Portfolio — Éd. 2026</span>
          <span className="hidden sm:inline">Indépendant / Freelance</span>
          <span>Abidjan&nbsp;·&nbsp;CI</span>
        </div>

        {/* Headline grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end mt-8 md:mt-8">
          {/* Name + roles */}
          <div className="lg:col-span-8">
            <p
              className="lite-rise font-mono text-sm font-semibold uppercase tracking-[0.22em] text-accent-text mb-5"
              style={{ animationDelay: "0.12s" }}
            >
              {heroData.greeting}
            </p>
            <h1 className="lite-display text-ink ">
              <span
                className="lite-rise block lg:text-[clamp(4rem,12vw,11.5rem)] text-[clamp(4rem,16vw,11.5rem)]"
                style={{ animationDelay: "0.18s" }}
              >
                DAVID
              </span>
              <span
                className="lite-rise block -mt-[0.06em]  lg:text-[clamp(2.3rem,6.9vw,6.7rem)] text-[clamp(2.3rem,9.5vw,6.7rem)] text-ink/70"
                style={{ animationDelay: "0.26s" }}
              >
                ABRAHAM
                <span className="text-vermilion align-super text-[0.28em] ml-1">
                  ®
                </span>
              </span>
            </h1>

            <div
              className="lite-rise mt-7 flex flex-wrap items-center gap-x-4 gap-y-2"
              style={{ animationDelay: "0.34s" }}
            >
              <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl">
                Développeur Full‑Stack
              </span>
              <span className="text-vermilion text-2xl md:text-3xl leading-none">
                ✺
              </span>
              <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl">
                Designer UI/UX
              </span>
            </div>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              className="lite-rise relative w-60 sm:w-52 lg:w-full max-w-[280px]"
              style={{ animationDelay: "0.42s" }}
            >
              <div className="absolute -inset-3 bg-vermilion -rotate-3 " />
              <img
                src="/profile/face-identiter-large.webp"
                alt="Portrait de David Abraham"
                width={560}
                height={700}
                loading="eager"
                decoding="async"
                className="relative w-full aspect-[4/5] object-cover object-top border-2 border-ink grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700"
              />
              <span className="absolute -bottom-3 -right-2 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5">
                Est. Abidjan
              </span>
            </div>
          </div>
        </div>

        {/* Intro + CTA + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 md:mt-16 border-t border-ink/35 pt-8">
          <div className="lg:col-span-6">
            <p
              className="lite-rise text-lg md:text-xl leading-relaxed text-ink/80 max-w-xl"
              style={{ animationDelay: "0.5s" }}
            >
              {aboutData.pitch}
            </p>
            <div
              className="lite-rise flex flex-wrap items-center gap-3 mt-8"
              style={{ animationDelay: "0.58s" }}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-ink text-paper font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-vermilion transition-colors"
              >
                Voir les travaux
                <span className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a
                href={`https://wa.me/${contactData.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 border-2 border-ink font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
              >
                WhatsApp
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href="/cv.pdf"
                download="CV-David-Abraham.pdf"
                className="group inline-flex items-center gap-2 border-2 border-ink font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
              >
                Télécharger le CV
                <span className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink/15 border border-ink/35 self-start">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="lite-rise bg-paper p-5"
                style={{ animationDelay: `${0.6 + i * 0.06}s` }}
              >
                <div className="lite-display text-4xl md:text-5xl text-vermilion leading-none">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink mt-2 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="lite-marquee-wrap mt-14 md:mt-20 border-y-2 border-ink overflow-hidden bg-ink text-paper">
        <div
          className="lite-marquee py-4"
          style={{ "--marquee-duration": "30s" } as React.CSSProperties}
        >
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span
              key={i}
              className="font-display font-bold text-2xl md:text-4xl uppercase mx-6 md:mx-10 inline-flex items-center gap-6 md:gap-10"
            >
              {word}
              <span className="text-vermilion text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
