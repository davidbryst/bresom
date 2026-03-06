import { ArrowRight } from "lucide-react";
import { SPACING } from "~/config/spacingConfig";

interface MiniCTAProps {
  message: string;
  ctaText?: string;
  href?: string;
}

export default function MiniCTA({
  message,
  ctaText = "Me contacter",
  href = "#contact",
}: MiniCTAProps) {
  return (
    <div className={`${SPACING.cta.py} ${SPACING.cta.mt} px-4 sm:px-6 text-center`}>
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Message */}
        <p className="text-light-secondary text-xl sm:text-2xl md:text-3xl font-medium">
          {message}
        </p>

        {/* CTA Button */}
        <a
          href={href}
          className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-dark-card/60 hover:bg-dark-surface/80 border border-violet-primary/30 hover:border-violet-accent/60 rounded-xl text-violet-accent hover:text-violet-light text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-primary/20"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
}

/**
 * CTA après Projects
 */
export function ProjectsCTA() {
  return (
    <MiniCTA
      message="Un projet similaire en tête ?"
      ctaText="Discutons-en"
    />
  );
}

/**
 * CTA après Skills
 */
export function SkillsCTA() {
  return (
    <MiniCTA
      message="Besoin de ces compétences ?"
      ctaText="Parlons projet"
    />
  );
}
