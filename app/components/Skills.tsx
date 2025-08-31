"use client";
 
import { Typography } from "@material-tailwind/react";
import { Brain, Code, Palette, Smartphone } from "lucide-react";

import { useState } from "react";
import BackgroundGlobe from "./BackgroundGlobe";
import { log } from "three/tsl";



type SkillItem = {
  name: string;
  level: number; // 0 - 100
  tags?: string[];
  years?: number;
  summary?: string;
};

type SkillBucket = {
  title: "Technologies" | "Logiciels" | "Concepts" | "Serverless";
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
          { name: "React / Next.js / Remix / Angular", level: 90, years: 3, tags: ["TypeScript ", "SSR", "JavaScript"], summary: "Apps SPA/SSR, gestion état, routing, formulaires et fetching." },
          // { name: "Flutter Web (dart)", level: 90, years: 3, tags: ["Dart", "Flutter Web"], summary: "Apps SPA/SSR, gestion état, routing, formulaires et fetching." },
          { name: "Node.js / Express / Nest", level: 86, years: 3, tags: ["REST", "OAuth", "JWT"], summary: "APIs REST sécurisées, middleware, services, validation, ORM." },
          { name: "Spring Boot", level: 86, years: 3, tags: ["JAVA", "Spring Security", "JWT"], summary: "APIs REST sécurisées, middleware, services, validation, ORM." },
          { name: "Laravel", level: 92, years: 4, tags: ["php", "livewire", "inertia", "inertia-laravel"], summary: "Typage strict, génériques, utilitaires, DX et outillage." },
          { name: "Tailwind CSS", level: 90, years: 3, tags: ["Design tokens", "Utility‑first"], summary: "Design system utilitaire, composants composables, theming." },
          { name: "SQL / PostgreSQL", level: 82, years: 3, tags: ["Schemas", "Joins"], summary: "Modélisation relationnelle, requêtes complexes, migrations." },
          { name: "MongoDB", level: 78, years: 2, tags: ["Indexes", "Aggregation"], summary: "Modèles documents, pipelines d’agrégation, indexation." },
        ],
      },
      {
        title: "Logiciels",
        items: [
          { name: "Git / GitHub", level: 90, years: 5, tags: ["Flow", "PRs"], summary: "Flux Git, PRs, review, branches, résolution de conflits." },
          { name: "Postman", level: 85, years: 3, tags: ["Collections", "Tests"], summary: "Scripts de tests, environnements, mock server, partage." },
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
        title: "Concepts",
        items: [
          { name: "UI/UX Design", level: 84, years: 3, tags: ["Wireframes", "Prototypage"], summary: "Parcours, architecture d’info, feedbacks, heuristiques." },
          { name: "Material UI / System", level: 80, years: 2, tags: ["Components", "Theming"], summary: "Bibliothèques UI cohérentes, thèmes, accessibilité." },
          // { name: "Framer Motion", level: 75, years: 1, tags: ["UX Animations"], summary: "Animations douces, transitions contextuelles, micro‑interactions." },
          { name: "Responsive Design", level: 91, years: 4, tags: ["Mobile‑first"], summary: "Grilles fluides, breakpoints, images adaptatives." },
          { name: "Accessibilité", level: 78, years: 2, tags: ["Contrastes", "Clavier"], summary: "Navigation clavier, labels, rôles, zones dynamiques." },
        ],
      },
      // {
      //   title: "Technologies",
      //   items: [
      //     // { name: "Tailwind CSS", level: 90, years: 3, tags: ["Design tokens", "Utility‑first"], summary: "Design system utilitaire, composants composables, theming." },
      //   ],
      // },
      {
        title: "Logiciels",
        items: [
          { name: "Figma", level: 90, years: 3, tags: ["Auto‑layout", "Design System"], summary: "Librairies de composants, prototypage, handoff dev." },
          { name: "Adobe XD", level: 72, years: 2 },
          { name: "Photoshop", level: 76, years: 4 },
          { name: "Illustrator", level: 70, years: 3 },
          { name: "Blender", level: 70, years: 3 },
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
          { name: "React Native / Expo", level: 82, years: 2, tags: ["Expo", "RN CLI"], summary: "UI native, navigation, accès capteurs, packaging." },
          { name: "Flutter Mobile ",  level: 66, years: 1, tags: ["Dart", "RN CLI"], summary: "Widgets, état et déploiement multiplateforme." },
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
      // {
      //   title: "Concepts",
      //   items: [
      //     { name: "Cross‑platform", level: 85, years: 2, summary: "Partage de code, abstraction, composants réutilisables." },
      //     { name: "Performance", level: 78, years: 2, tags: ["Profiling", "Memo"], summary: "Optimisations UI/state, profils, FPS stable." },
      //     { name: "Offline‑first", level: 72, years: 2, tags: ["Cache", "Sync"], summary: "Stratégies de cache, sync réseau, résilience." },
      //     { name: "Notifications push", level: 68, years: 1, summary: "Permissions, tokens, routing in‑app." },
      //   ],
      // },
    ],
  },
  {
    category: "Autres",
    icon: Brain,
    description: "Applications multi‑plateformes performantes avec une base de code partagée.",
    buckets: [
      {
        title: "Serverless",
        items: [
          { name: "Cloudflare Workers", level: 76, years: 2, tags: ["Edge", "KV"], summary: "Exécution à l’edge, KV storage, latence minimale, caching." },
          { name: "AWS Lambda", level: 78, years: 2, tags: ["API GW", "S3"], summary: "APIs serverless, triggers S3/cron, intégrations managées." },
          { name: "Supabase", level: 82, years: 2, tags: ["Auth", "DB", "Storage"], summary: "Postgres managé, Auth, stockage, Realtime, edge functions." },
          { name: "Firebase", level: 80, years: 3, tags: ["Auth", "Firestore"], summary: "Auth, Firestore, hosting et functions pour MVP rapides." },
        ],
      },
      // {
      //   title: "Concepts",
      //   items: [
      //     { name: "Cross‑platform", level: 85, years: 2, summary: "Partage de code, abstraction, composants réutilisables." },
      //     { name: "Performance", level: 78, years: 2, tags: ["Profiling", "Memo"], summary: "Optimisations UI/state, profils, FPS stable." },
      //     { name: "Offline‑first", level: 72, years: 2, tags: ["Cache", "Sync"], summary: "Stratégies de cache, sync réseau, résilience." },
      //     { name: "Notifications push", level: 68, years: 1, summary: "Permissions, tokens, routing in‑app." },
      //   ],
      // },
    ],
  },
];

type SkillListItemProps = {
  item: SkillItem;
};

function SkillListItem({ item }: SkillListItemProps) {
  return (
    <li aria-label={`${item.name} — ${item.level}%`}>
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <span className="text-white/90 text-xs sm:text-sm" aria-hidden="true">{item.name}</span>
        {/* <div className="flex items-center gap-2">
          {typeof item.years === 'number' && (
            <span className="text-white/60 text-[11px]">{`Exp. ${item.years} an${item.years > 1 ? 's' : ''}`}</span>
          )}
          <span className="text-white/60 text-xs tabular-nums" aria-hidden="true">{item.level}%</span>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] ${levelInfo.className}`}>{levelInfo.label}</span>
        </div> */}
      </div>
      <div className="mt-2 h-2 sm:h-2.5 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-700 will-change-[width] bg-gray-800 dark:bg-gradient-to-r dark:from-violet-500 dark:via-fuchsia-500 dark:to-pink-500"
          style={{ width: `${item.level}%` }}
          role="progressbar"
          aria-valuenow={item.level}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {(item.tags?.length || item.summary) && (
        <div className="mt-2 flex flex-wrap gap-1 sm:gap-1.5">
          {item.tags?.map((tag) => (
            <span
              key={`${item.name}-${tag}`}
              className="px-1.5 sm:px-2 py-0.5 rounded-full border border-white/10 bg-black/30 text-white/70 text-[10px] sm:text-[11px]"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {item.summary && (
            <span className="w-full text-white/60 text-[11px] sm:text-[12px] leading-relaxed">
              {item.summary}
            </span>
          )}
        </div>
      )}
    </li>
  );
}

type SkillBucketSectionProps = {
  bucket: SkillBucket;
  ariaScope: string;
};

function SkillBucketSection({ bucket, ariaScope }: SkillBucketSectionProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <Typography className="text-white/80 text-xs sm:text-sm font-semibold">
          {bucket.title}
        </Typography>
      </div>
      <ul className="flex flex-warp flex-col gap-3 sm:gap-4" aria-label={`${bucket.title} — ${ariaScope}`}>
      {/* <ul className="grid grid-cols-1 sm:grid-cols-2  grid-rows-1 sm:grid-rows-2 gap-4" aria-label={`${bucket.title} — ${ariaScope}`}> */}
        {bucket.items.map((item) => (
            <SkillListItem key={item.name} item={item} />
          ))}
        {/* {[...bucket.items]
          .sort((a, b) => b.level - a.level)
          .map((item) => (
            <SkillListItem key={item.name} item={item} />
          ))} */}
      </ul>
    </div>
  );
}


function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveIcon = domainGroups[activeIndex].icon;

  return (
    <section id="Skills" aria-labelledby="skills-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* <BackgroundGlobe /> */}
      <div className="max-w-6xl mx-auto flex flex-col">
        <Typography id="projects-title" variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Mes compétences
        </Typography>
        {/* Switch/One horizontal en haut */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 select-none">
          {domainGroups.map((group, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 rounded-full border-2 transition-all duration-300 text-xs sm:text-sm font-medium w-full sm:w-auto justify-center
                ${activeIndex === index ? 'border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-300 scale-105 shadow-lg' : 'border-white/20 bg-black/30 text-white/60 hover:border-fuchsia-400 hover:text-fuchsia-300'}`}
              // aria-label={group.category}
            >
              <group.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">{group.category}</span>
            </button>
          ))}
        </div>
        {/* Slide du groupe actif */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full rounded-xl border border-white/10 bg-black/30 transition-all duration-500 shadow-xl animate-fadein">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center">
                  <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <Typography variant="h3" className="text-lg sm:text-xl font-semibold text-white">
                  {domainGroups[activeIndex].category}
                </Typography>
              </div>
              <p className="text-white/60 text-sm mb-4 sm:mb-6 leading-relaxed">
                {domainGroups[activeIndex].description}
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col lg:flex-row h-max gap-4">
                  {domainGroups[activeIndex].buckets.map((bucket) => (
                    <SkillBucketSection key={bucket.title} bucket={bucket} ariaScope={domainGroups[activeIndex].category} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;