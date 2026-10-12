import { aboutData } from "~/data/content";
import Reveal from "./Reveal";

const FACTS = [
  { k: "Expérience", v: aboutData.experience },
  { k: "Stack", v: aboutData.stack },
  { k: "Valeurs", v: aboutData.values },
];

export default function LiteAbout() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 border-t-2 border-ink bg-bone/40"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
          (02) — À propos
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-6 items-start">
          {/* Portrait + signature */}
          <Reveal className="lg:col-span-5">
            <div className="relative max-w-sm">
              <img
                src="/profile/face-identiter.webp"
                alt="David Abraham"
                width={853}
                height={1280}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover object-top border-2 border-ink"
              />
              <div className="absolute -bottom-4 -left-4 bg-vermilion text-ink px-4 py-3 max-w-[14rem]">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] leading-snug">
                  Designer + Développeur — un seul interlocuteur, du concept au
                  déploiement.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Statement + points + facts */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="lite-display text-[clamp(2rem,5vw,3.75rem)] max-w-2xl">
                Je transforme des idées en interfaces{" "}
                <span className="text-vermilion">utiles</span>, accessibles et{" "}
                <span className="text-cobalt">modernes</span>.
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 text-lg text-ink/75 leading-relaxed max-w-2xl">
                {aboutData.description}
              </p>
            </Reveal>

            {/* Points */}
            <Reveal delay={120}>
              <ul className="mt-8 space-y-3 max-w-2xl">
                {aboutData.points.map((point, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-xs text-accent-text mt-1.5 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-ink/80">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Facts */}
            <Reveal delay={160}>
              <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/15 border border-ink/35">
                {FACTS.map((f) => (
                  <div key={f.k} className="bg-paper p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">
                      {f.k}
                    </dt>
                    <dd className="mt-2 font-display font-bold text-base leading-snug">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
