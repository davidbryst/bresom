import { Code, Palette, Smartphone } from "lucide-react";

type SkillItem = {
  name: string;
  level: number; // 0 - 100
  tags?: string[];
  years?: number;
  summary?: string;
};

type SkillBucket = {
  title: "Technologies" | "Logiciels" | "Concepts";
  items: SkillItem[];
};

type DomainGroup = {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  buckets: SkillBucket[];
};

const domainGroups: DomainGroup[] = [
  {
    category: "Développement Web",
    icon: Code,
    description: "Front‑end et back‑end modernes, bonnes pratiques, performance et accessibilité.",
    buckets: [
      {
        title: "Technologies",
        items: [
          { name: "React / Next.js / Remix", level: 90, years: 3, tags: ["Hooks", "SSR", "Routing"], summary: "Apps SPA/SSR, gestion état, routing, formulaires et fetching." },
          { name: "Node.js / Express / Nest", level: 86, years: 3, tags: ["REST", "Auth", "JWT"], summary: "APIs REST sécurisées, middleware, services, validation, ORM." },
          { name: "TypeScript / JavaScript", level: 92, years: 4, tags: ["Typesafe", "Tooling"], summary: "Typage strict, génériques, utilitaires, DX et outillage." },
          { name: "SQL / PostgreSQL", level: 82, years: 3, tags: ["Schemas", "Joins"], summary: "Modélisation relationnelle, requêtes complexes, migrations." },
          { name: "MongoDB", level: 78, years: 2, tags: ["Indexes", "Aggregation"], summary: "Modèles documents, pipelines d’agrégation, indexation." },
        ],
      },
      {
        title: "Logiciels",
        items: [
          { name: "VS Code", level: 95, years: 5, tags: ["Devtools", "Extensions"], summary: "Efficacité via raccourcis, snippets, extensions ciblées." },
          { name: "Git / GitHub", level: 90, years: 5, tags: ["Flow", "PRs"], summary: "Flux Git, PRs, review, branches, résolution de conflits." },
          { name: "Postman", level: 85, years: 3, tags: ["Collections", "Tests"], summary: "Scripts de tests, environnements, mock server, partage." },
        ],
      },
      {
        title: "Concepts",
        items: [
          { name: "Accessibilité (a11y)", level: 80, years: 2, tags: ["ARIA", "Couleurs"], summary: "Structure sémantique, focus, contrastes, lecteurs d’écran." },
          { name: "Performance", level: 82, years: 3, tags: ["Lazy‑load", "Code‑split"], summary: "Bundle‑split, caching, streaming SSR, images optimisées." },
          { name: "Tests", level: 70, years: 2, tags: ["Unit", "E2E"], summary: "Stratégies de tests, couverture ciblée, CI basique." },
        ],
      },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    description: "Conception orientée utilisateur, systèmes de design et prototypage rapide.",
    buckets: [
      {
        title: "Technologies",
        items: [
          { name: "Tailwind CSS", level: 90, years: 3, tags: ["Design tokens", "Utility‑first"], summary: "Design system utilitaire, composants composables, theming." },
          { name: "Material UI / System", level: 80, years: 2, tags: ["Components", "Theming"], summary: "Bibliothèques UI cohérentes, thèmes, accessibilité." },
          { name: "Framer Motion", level: 75, years: 1, tags: ["UX Animations"], summary: "Animations douces, transitions contextuelles, micro‑interactions." },
        ],
      },
      {
        title: "Logiciels",
        items: [
          { name: "Figma", level: 90, years: 3, tags: ["Auto‑layout", "Design System"], summary: "Librairies de composants, prototypage, handoff dev." },
          { name: "Adobe XD", level: 72, years: 2 },
          { name: "Photoshop", level: 76, years: 4 },
          { name: "Illustrator", level: 70, years: 3 },
        ],
      },
      {
        title: "Concepts",
        items: [
          { name: "UI/UX Design", level: 84, years: 3, tags: ["Wireframes", "Prototypage"], summary: "Parcours, architecture d’info, feedbacks, heuristiques." },
          { name: "Responsive Design", level: 91, years: 4, tags: ["Mobile‑first"], summary: "Grilles fluides, breakpoints, images adaptatives." },
          { name: "Accessibilité", level: 78, years: 2, tags: ["Contrastes", "Clavier"], summary: "Navigation clavier, labels, rôles, zones dynamiques." },
        ],
      },
    ],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    description: "Applications multi‑plateformes performantes avec une base de code partagée.",
    buckets: [
      {
        title: "Technologies",
        items: [
          { name: "React Native", level: 82, years: 2, tags: ["Expo", "RN CLI"], summary: "UI native, navigation, accès capteurs, packaging." },
          { name: "Flutter", level: 66, years: 1, summary: "Widgets, état et déploiement multiplateforme." },
          { name: "SQLite / AsyncStorage", level: 70, years: 2, summary: "Persistance locale, synchronisation, migrations." },
        ],
      },
      {
        title: "Logiciels",
        items: [
          { name: "Android Studio", level: 75, years: 2 },
          { name: "Xcode", level: 68, years: 1 },
          { name: "Expo Go", level: 80, years: 2 },
        ],
      },
      {
        title: "Concepts",
        items: [
          { name: "Cross‑platform", level: 85, years: 2, summary: "Partage de code, abstraction, composants réutilisables." },
          { name: "Performance", level: 78, years: 2, tags: ["Profiling", "Memo"], summary: "Optimisations UI/state, profils, FPS stable." },
          { name: "Offline‑first", level: 72, years: 2, tags: ["Cache", "Sync"], summary: "Stratégies de cache, sync réseau, résilience." },
          { name: "Notifications push", level: 68, years: 1, summary: "Permissions, tokens, routing in‑app." },
        ],
      },
    ],
  },
];

function getLevelLabel(level: number): { label: string; className: string } {
  if (level >= 90) return { label: "Expert", className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
  if (level >= 75) return { label: "Avancé", className: "bg-sky-500/20 text-sky-300 border-sky-500/30" };
  if (level >= 60) return { label: "Intermédiaire", className: "bg-violet-500/20 text-violet-300 border-violet-500/30" };
  return { label: "Débutant", className: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30" };
}

export default function Skills() {
  return (
    <section id="Skills" aria-labelledby="skills-title" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 id="skills-title" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Mes Compétences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {domainGroups.map((group) => (
            <div
              key={group.category}
              className="group relative overflow-hidden rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                    <group.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {group.category}
                  </h3>
                </div>
                <p className="text-white/60 text-sm mb-5">
                  {group.description}
                </p>
                <div className="space-y-6">
                  {group.buckets.map((bucket) => (
                    <div key={bucket.title}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm font-semibold">
                          {bucket.title}
                        </span>
                      </div>
                      <ul className="space-y-4" aria-label={`${bucket.title} — ${group.category}`}>
                        {[...bucket.items]
                          .sort((a, b) => b.level - a.level)
                          .map((item) => {
                            const levelInfo = getLevelLabel(item.level);
                            return (
                              <li key={item.name} aria-label={`${item.name} — ${item.level}%`}>
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-white/90 text-sm" aria-hidden="true">{item.name}</span>
                                  <div className="flex items-center gap-2">
                                    {typeof item.years === 'number' && (
                                      <span className="text-white/60 text-[11px]">{`Exp. ${item.years} an${item.years > 1 ? 's' : ''}`}</span>
                                    )}
                                    <span className="text-white/60 text-xs tabular-nums" aria-hidden="true">{item.level}%</span>
                                    <span className={`px-2 py-0.5 rounded-full border text-[10px] ${levelInfo.className}`}>{levelInfo.label}</span>
                                  </div>
                                </div>
                            <div className="mt-2 h-2.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-all duration-700 will-change-[width]"
                                style={{ width: `${item.level}%` }}
                                role="progressbar"
                                aria-valuenow={item.level}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            {(item.tags?.length || item.summary) && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {item.tags?.map((tag) => (
                                  <span
                                    key={`${item.name}-${tag}`}
                                    className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-[11px]"
                                    title={tag}
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {item.summary && (
                                  <span className="w-full text-white/60 text-[12px] leading-relaxed">
                                    {item.summary}
                                  </span>
                                )}
                              </div>
                            )}
                          </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}