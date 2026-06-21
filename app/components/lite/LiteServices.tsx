import { dosData } from "~/data/content";
import Reveal from "./Reveal";

export default function LiteServices() {
  return (
    <section
      id="services"
      className="relative py-20 md:py-32 border-t-2 border-ink"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
              (03) — Services
            </span>
            <h2 className="lite-display text-[clamp(2.75rem,8vw,7rem)] mt-3">
              CE QUE JE FAIS
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/80 md:text-right md:max-w-[16rem]">
            De la maquette au déploiement — un seul interlocuteur.
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
                    <span className="lite-display text-4xl md:text-5xl text-ink/30 group-hover:text-vermilion transition-colors duration-500 sm:w-24 shrink-0">
                      0{i + 1}
                    </span>
                    <div className="sm:w-16 shrink-0">
                      <Icon
                        className="w-9 h-9 text-ink group-hover:text-paper transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-4xl group-hover:text-paper transition-colors duration-500 sm:flex-1">
                      {item.titre}
                    </h3>
                    <p className="text-ink/65 group-hover:text-paper/80 transition-colors duration-500 max-w-sm md:text-right">
                      {item.description}
                    </p>
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
