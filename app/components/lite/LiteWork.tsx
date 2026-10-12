import { Link } from "@remix-run/react";
import { projectsData } from "~/data/content";
import Reveal from "./Reveal";

// Project mockups live in /public/projet; content.ts stores them as "/name.webp".
const imgPath = (image: string) => `/projet${image}`;

const ACCENTS = ["text-vermilion", "text-cobalt", "text-forest"];

export default function LiteWork() {
  return (
    <section
      id="work"
      className="relative py-20 md:py-32 border-t-2 border-ink"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        {/* Section header */}
        <div className="flex flex-col -md:flex-row -md:items-end -md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
              (01) — Sélection
            </span>
            <h2 className="lite-display text-[clamp(1.5rem,7vw,6.6rem)] mt-3">
              TRAVAUX
            </h2>
          </div>
          <p className="self-end font-mono text-xs uppercase tracking-[0.16em] text-ink/80 md:text-right md:max-w-[16rem]">
            Sites, applications & systèmes de design — {projectsData.length}{" "}
            projets sélectionnés.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15 border border-ink/35">
          {projectsData.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80} className="bg-paper">
              <Link
                to={`/projets/${p.slug}`}
                className="group block h-full p-5 md:p-7 hover:bg-bone transition-colors duration-500"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    className={`lite-display text-3xl md:text-4xl ${
                      ACCENTS[i % ACCENTS.length]
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-lg text-ink/40 transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                {/* Image */}
                <div className="mt-5 overflow-hidden border border-ink/35 bg-ink/[0.03] aspect-[16/10]">
                  <img
                    src={imgPath(p.cardImage ?? p.image)}
                    alt={`Aperçu du projet ${p.title}`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full ${
                      true ? "object-cover object-center" : "object-contain"
                    } grayscale-[35%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.04]`}
                    // className="w-full h-full object-cover object-center grayscale-[35%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text */}
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight">
                    {p.title}
                  </h3>
                  {p.status && (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] bg-ink text-paper px-2.5 py-1">
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-ink/65 text-sm md:text-base">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] uppercase tracking-wide text-ink/60 border border-ink/20 px-2.5 py-1"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
