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
    <div className={`${SPACING.cta.py} ${SPACING.cta.mt} px-6 text-center`}>
      <p className="text-light-secondary text-2xl md:text-3xl mb-4">
        {message}
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-2 text-xl md:text-2xl text-violet-accent hover:text-violet-light transition-colors group"
      >
        <span className="font-semibold">{ctaText}</span>
        <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform" />
      </a>
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
