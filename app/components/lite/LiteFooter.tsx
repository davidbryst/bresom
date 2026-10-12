import { contactData } from "~/data/content";

const LINKS = [
  { label: "Travaux", href: "/#work" },
  { label: "À propos", href: "/#about" },
  { label: "Offres", href: "/#services" },
  { label: "Compétences", href: "/#skills" },
  { label: "Parcours", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function LiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-paper text-ink border-t-2 border-ink">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 pt-14 md:pt-20 pb-8">
        {/* Top: CTA + nav */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-ink/35">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/80">
              Disponible pour de nouveaux projets
            </p>
            <a
              href={`mailto:${contactData.email}`}
              className="lite-link inline-block lite-display text-[clamp(1.6rem,3.5vw,3.5rem)] mt-3 hover:text-vermilion transition-colors break-all"
            >
              {contactData.email}
            </a>
          </div>
          <nav className="md:col-span-5 md:justify-self-end">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="lite-link font-mono text-xs uppercase tracking-[0.16em] text-ink/65 hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Giant wordmark */}
        <a
          href="/#top"
          aria-label="Retour en haut"
          className="block lite-display  leading-[0.8] mt-12 group hover:text-vermilion transition-colors"
        >
          <div>
            <span className="block text-[clamp(4rem,15vw,19rem)]">DAVID</span>
            <span className="block text-[clamp(2.3rem,9vw,12rem)] text-ink/55 group-hover:text-vermilion">
              ABRAHAM
            </span>
          </div>
        </a>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/80">
          <span>© {year} David Abraham — Tous droits réservés</span>
          <span>Abidjan, Côte d'Ivoire · {year}</span>
          <a href="/#top" className="lite-link hover:text-ink">
            Retour en haut ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
