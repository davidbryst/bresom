import { dosData, processData } from "~/data/content";
import Reveal from "./Reveal";

export default function LiteServices() {
  return (
    <section
      id="services"
      className="relative py-20 md:py-32 border-t-2 border-ink"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col -md:flex-row -md:items-end -md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
              (03) — Offres
            </span>
            <h2 className="lite-display text-[clamp(1.5rem,7vw,6.6rem)] mt-3">
              MES OFFRES
            </h2>
          </div>
          <p className="self-end font-mono text-xs uppercase tracking-[0.16em] text-ink/80 md:text-right md:max-w-[16rem]">
            Prix d&apos;appel indicatifs — devis gratuit après un premier appel.
          </p>
        </div>

        <div className="border-t border-ink">
          {dosData.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.titre} delay={i * 70}>
                <div className="group relative border-b border-ink overflow-hidden px-10">
                  {/* Hover fill */}
                  <span className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-lite" />
                  <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-8 md:py-10">
                    <span className="lite-display text-5xl md:text-7xl text-ink/30 group-hover:text-vermilion transition-colors duration-500 leading-none sm:w-28 shrink-0">
                      0{i + 1}
                    </span>
                    <div className="sm:w-16 shrink-0">
                      <Icon
                        className="w-9 h-9 sm:ml-10 text-ink group-hover:text-paper transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-4xl group-hover:text-paper transition-colors duration-500 sm:flex-1">
                      {item.titre}
                    </h3>
                    <div className="max-w-sm md:text-right">
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-vermilion">
                        {item.price}
                      </p>
                      <p className="mt-2 text-ink/65 group-hover:text-paper/80 transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Process */}
        <Reveal>
          <ol className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/35">
            {processData.map((step, i) => (
              <li key={step.titre} className="bg-paper p-5 md:p-6">
                <span className="lite-display text-3xl text-vermilion leading-none">
                  0{i + 1}
                </span>
                <p className="mt-3 font-display font-bold text-lg">
                  {step.titre}
                </p>
                <p className="mt-1 text-sm text-ink/65">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-ink text-paper font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-vermilion transition-colors"
          >
            Demander un devis
            <span className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
