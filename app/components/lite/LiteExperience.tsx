import { experiencesData } from "~/data/content";
import Reveal from "./Reveal";

export default function LiteExperience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 border-t-2 border-ink"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">
              (05) — Parcours
            </span>
            <h2 className="lite-display text-[clamp(2.75rem,8vw,7rem)] mt-3">
              EXPÉRIENCE
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/55 md:text-right md:max-w-[16rem]">
            Trois maisons, un fil rouge : design + code en bout en bout.
          </p>
        </div>

        <div className="border-t border-ink">
          {experiencesData.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 70}>
              <article className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-b border-ink py-8 md:py-12">
                {/* Left: index + date */}
                <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start justify-between gap-2">
                  <span className="lite-display text-3xl md:text-5xl text-ink/25 group-hover:text-vermilion transition-colors duration-500">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                    {exp.date}
                  </span>
                </div>

                {/* Right: company + role + responsibilities */}
                <div className="md:col-span-9">
                  <h3 className="font-display font-extrabold text-2xl md:text-4xl leading-tight">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-vermilion font-medium">
                    {exp.position}
                  </p>
                  <ul className="mt-5 space-y-2.5 max-w-3xl">
                    {exp.responsibilities.map((r, ri) => (
                      <li key={ri} className="flex gap-3 text-ink/75">
                        <span className="text-ink/30 mt-2 shrink-0 h-px w-4 bg-ink/30" />
                        <span className="text-sm md:text-base leading-relaxed">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
