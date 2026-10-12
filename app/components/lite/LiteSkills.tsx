import { skillsData } from "~/data/content";
import Reveal from "./Reveal";

// One color per domain — gives the "colorful" register without noise.
const DOMAIN = [
  { bar: "bg-vermilion", text: "text-vermilion" },
  { bar: "bg-cobalt", text: "text-cobalt" },
  { bar: "bg-forest", text: "text-forest" },
  { bar: "bg-amber-500", text: "text-amber-500" },
  { bar: "bg-vermilion", text: "text-vermilion" },
  { bar: "bg-cobalt", text: "text-cobalt" },
];


export default function LiteSkills() {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 border-t-2 border-ink bg-bone/40"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col -md:flex-row -md:items-end -md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
              (04) — Expertise
            </span>
            <h2 className="lite-display text-[clamp(0.5rem,6vw,6.6rem)] sm:text-[clamp(1.5rem,6vw,6.6rem)] mt-3">
              COMPÉTENCES
            </h2>
          </div>
          <p className="self-end font-mono text-xs uppercase tracking-[0.16em] text-ink/80 md:text-right md:max-w-[18rem]">
            Six domaines, du pixel au serveur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/15 border border-ink/35">
          {skillsData.map((domain, di) => {
            const Icon = domain.icon;
            const color = DOMAIN[di % DOMAIN.length];
            return (
              <Reveal
                key={domain.category}
                delay={(di % 2) * 80}
                className="bg-paper"
              >
                <div className="p-6 md:p-8 h-full">
                  {/* Domain header */}
                  <div className="flex items-start gap-4 border-b border-ink/35 pb-5">
                    <Icon
                      className={`w-7 h-7 shrink-0 ${color.text}`}
                      strokeWidth={1.5}
                    />
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">
                        {domain.category}
                      </h3>
                      <p className="text-sm text-ink/60 mt-1">
                        {domain.description}
                      </p>
                    </div>
                    <span className="lite-display text-2xl text-ink/25">
                      0{di + 1}
                    </span>
                  </div>

                  {/* Buckets */}
                  <div className="mt-6 space-y-6">
                    {domain.buckets.map((bucket) => (
                      <div key={bucket.title}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-3">
                          {bucket.title}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {bucket.items.map((item) => (
                            <li
                              key={item.name}
                              className="group relative overflow-hidden border border-ink/20 px-3 py-2 transition-transform duration-300 ease-lite hover:-translate-y-1"
                            >
                              {/* Hover fill — slides up from the bottom, like the Services rows */}
                              <span className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-lite" />
                              <span className="relative font-medium text-sm md:text-base transition-colors duration-300 group-hover:text-paper">
                                {item.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
