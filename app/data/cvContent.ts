import { Code, Palette, Smartphone, Brain, Paintbrush } from "lucide-react";
import {
  AboutInfo,
  ContactInfo,
  DomainGroup,
  dosInfoItem,
  ExperienceItem,
  FormationItem,
  HeroInfo,
  Project,
  SkillBucket,
} from "./content";

// Données centralisées
export const heroData: HeroInfo = {
  greeting: "Salut 👋 Je suis",
  name: "DAVID ABRAHAM",
  subtitle: "Un passionné en",
  primaryLines: ["Graphisme & Design", "Développement Web & Mobile"],
  secondaryLines: [
    "Spécialisé dans la création de sites web et applications interactives.",
    "Spécialisé dans le design de sites web et applications interactives.",
  ],
};

export const aboutData: AboutInfo = {
  description:
    "Passionné par le design et le développement, j'aide les équipes à concevoir et livrer des produits web et mobiles fiables, performants et élégants. J'aime transformer des idées en interfaces utiles, accessibles et modernes.",
  points: [
    "Conception UI/UX et intégration pixel‑perfect.",
    "Développement front‑end React/Remix/Next et mobile React Native.",
    "API, bases de données et bonnes pratiques de qualité (tests, accessibilité).",
  ],
  experience: "3+ ans",
  stack: "TypeScript, React, Remix, Node.js",
  values: "Qualité, simplicité, professionnalisme",
};

export const contactData: ContactInfo = {
  email: "sh.david.abraham@gmail.com",
  phone: "+225 01 40 54 41 97 / +225 07 12 41 01 34 / +225 05 64 63 82 82",
  location: "CIV, Abidjan, Cocody, Riviera 2",
};

// Correction du type de dosData
export const dosData: dosInfoItem[] = [
  {
    titre: "Développement Web",
    description: "Création de sites performants, modernes et accessibles.",
    icon: Code,
  },
  {
    titre: "Développement Mobile",
    description: "Création d'applications mobiles natives et cross-platform.",
    icon: Smartphone,
  },
  {
    titre: "Design UI/UX",
    description: "Conception d'interfaces intuitives et esthétiques.",
    icon: Paintbrush,
  },
  // {
  //   titre: "Travail en équipe",
  //   description: "Collaboration agile avec les clients et les développeurs.",
  //   icon: Users,
  // },
];

export const projectsData: Project[] = [
  {
    title: "DavStore",
    description: "Plate-forme de commerce électronique",
    image: "/DavStore.png",
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/zTTfQHgcKZob5qFwajJuqS/DavStore?node-id=0-1&t=CXe7jUEU1ARIFB2N-1",
  },
  {
    title: "DavHotel",
    description: "Plate-forme de réservation hôtelière",
    image: "/DavHotel.png",
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/FiPEHvKORyhPGi57VmiioM/DavHotel?node-id=0-1&t=9PhqDAhIFeAcYoJc-1",
  },
  {
    title: "Beats d'Éléphants",
    description: "Plate-forme de musique : trap, afro, drill, boombap.",
    image: "/beatsdelephants.png",
    tags: ["Remix.js", "beats", "musique ", "drill"],
    link: "https://beatsdelephants.vercel.app/",
  },
];

export const experiencesData: ExperienceItem[] = [
  {
    company: "SCHIBA HOLDING",
    position: "Infographe, Développeur Web & Mobile Full Stack",
    date: "SEPT 2024 - DÉC 2025",
    responsibilities: [
      "Développement et maintenance de plusieurs applications web pour une douzaine de filiales du groupe Schiba Holding (front-end, back-end et base de données).",
      "Intégration d'API tierces (paiements en ligne, gestion d'utilisateurs).",
      "Conception d'éléments graphiques, illustrations et supports visuels clairs et engageants.",
    ],
  },
  {
    company: "EMAIV-JC",
    position: "Infographe, Développeur Web & Mobile Full Stack",
    date: "JANV 2024 - AOÛT 2024",
    responsibilities: [
      "Développement et maintenance d'applications web de prise de rendez-vous pour des projets voyage, immigration et de visa (front-end, back-end et base de données).",
      "Création d'éléments graphiques et visuels pour une communication claire et efficace.",
    ],
  },
  {
    company: "BIM GROUPE",
    position: "Développeur Mobile",
    date: "JUIL 2022 - SEPT 2023",
    responsibilities: [
      "Conception et développement d'interfaces attrayantes et intuitives, optimisées pour différents appareils.",
      "Garantie d'un affichage cohérent et d'une expérience utilisateur optimale sur divers écrans.",
      "Collaboration avec les développeurs front-end pour intégrer les conceptions et résoudre les problèmes techniques.",
    ],
  },
];
export const formationsData: FormationItem[] = [
  // {
  //   ecole: "UNIVERSITÉ FÉLIX HOUPHOUËT-BOIGNY",
  //   diplome: "Licence en Informatique",
  //   date: "2020 - 2023",
  //   desc: "Réseaux et infrastructure internet."
  // },
  {
    ecole: "ESATIC",
    diplome: "TWIN (Techniques du Web et de l'Internet)",
    date: "SEPT 2019 - JUILL 2022",
    desc: "Formation spécialisée en développement web et mobile, bases de données et administration système.",
  },
  {
    ecole: "LYCÉE CLASSIQUE D'ABIDJAN",
    diplome: "Baccalauréat",
    date: "2017 - 2019",
    // desc: "Formation générale avec spécialisation scientifique, développement des compétences analytiques et logiques."
  },
  // {
  //   ecole: "FORMATIONS EN LIGNE",
  //   diplome: "Certifications Web & Mobile",
  //   date: "2021 - 2024",
  //   desc: "Réseaux et infrastructure internet."
  // }
];

export const skillsData: SkillBucket[] = [
  {
    title: "Frontend",
    items: [
      { name: "Next.js", level: 88, years: 3 },
      { name: "Remix.js", level: 85, years: 2 },
      { name: "Angular.js", level: 75, years: 2 },
      { name: "TypeScript", level: 92, years: 3 },
      { name: "Tailwind CSS", level: 90, years: 3 },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "Expo", level: 80, years: 2 },
      { name: "Flutter", level: 66, years: 1 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", level: 86, years: 3 },
      { name: "NestJS", level: 78, years: 2 },
      { name: "Spring Boot", level: 86, years: 3 },
      { name: "Laravel", level: 92, years: 4 },
    ],
  },
  {
    title: "Bases de données",
    items: [
      { name: "PostgreSQL", level: 82, years: 3 },
      { name: "MySQL", level: 85, years: 4 },
      { name: "MongoDB", level: 78, years: 2 },
    ],
  },
  {
    title: "Graphisme",
    items: [
      { name: "Figma", level: 90, years: 3 },
      { name: "UI / UX Design", level: 80, years: 3 },
      { name: "Photoshop", level: 76, years: 4 },
      { name: "Illustrator", level: 70, years: 3 },
      { name: "Blender", level: 70, years: 3 },
    ],
  },
  {
    title: "Backend as a Service",
    items: [
      { name: "Supabase", level: 82, years: 2 },
      { name: "Firebase", level: 80, years: 3 },
      { name: "Auth0", level: 70, years: 1 },
      { name: "appwrite", level: 70, years: 1 },
      { name: "Stripe", level: 75, years: 2 },
    ],
  },
];
export const _skillsData: DomainGroup[] = [
  {
    category: "Développement Web",
    icon: Code,
    description:
      "Front‑end et back‑end modernes, bonnes pratiques, performance et accessibilité.",
    buckets: [
      {
        title: "Technologies",
        items: [
          {
            name: "React / Next.js / Remix / Angular",
            level: 90,
            years: 3,
            tags: ["TypeScript ", "SSR", "JavaScript"],
            summary:
              "Apps SPA/SSR, gestion état, routing, formulaires et fetching.",
          },
          {
            name: "Node.js / Express / Nest",
            level: 86,
            years: 3,
            tags: ["REST", "OAuth", "JWT"],
            summary:
              "APIs REST sécurisées, middleware, services, validation, ORM.",
          },
          {
            name: "Spring Boot",
            level: 86,
            years: 3,
            tags: ["JAVA", "Spring Security", "JWT"],
            summary:
              "APIs REST sécurisées, middleware, services, validation, ORM.",
          },
          {
            name: "Laravel",
            level: 92,
            years: 4,
            tags: ["php", "livewire", "inertia", "inertia-laravel"],
            summary: "Typage strict, génériques, utilitaires, DX et outillage.",
          },
          {
            name: "Tailwind CSS",
            level: 90,
            years: 3,
            tags: ["Design tokens", "Utility‑first"],
            summary:
              "Design system utilitaire, composants composables, theming.",
          },
          {
            name: "SQL / PostgreSQL",
            level: 82,
            years: 3,
            tags: ["Schemas", "Joins"],
            summary:
              "Modélisation relationnelle, requêtes complexes, migrations.",
          },
          {
            name: "MongoDB",
            level: 78,
            years: 2,
            tags: ["Indexes", "Aggregation"],
            summary: "Modèles documents, pipelines d'agrégation, indexation.",
          },
        ],
      },
      {
        title: "Logiciels",
        items: [
          {
            name: "Git / GitHub",
            level: 90,
            years: 5,
            tags: ["Flow", "PRs"],
            summary: "Flux Git, PRs, review, branches, résolution de conflits.",
          },
          {
            name: "Postman",
            level: 85,
            years: 3,
            tags: ["Collections", "Tests"],
            summary: "Scripts de tests, environnements, mock server, partage.",
          },
        ],
      },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    description:
      "Conception orientée utilisateur, systèmes de design et prototypage rapide.",
    buckets: [
      {
        title: "Concepts",
        items: [
          {
            name: "UI/UX Design",
            level: 84,
            years: 3,
            tags: ["Wireframes", "Prototypage"],
            summary: "Parcours, architecture d'info, feedbacks, heuristiques.",
          },
          {
            name: "Material UI / System",
            level: 80,
            years: 2,
            tags: ["Components", "Theming"],
            summary: "Bibliothèques UI cohérentes, thèmes, accessibilité.",
          },
          {
            name: "Responsive Design",
            level: 91,
            years: 4,
            tags: ["Mobile‑first"],
            summary: "Grilles fluides, breakpoints, images adaptatives.",
          },
          {
            name: "Accessibilité",
            level: 78,
            years: 2,
            tags: ["Contrastes", "Clavier"],
            summary: "Navigation clavier, labels, rôles, zones dynamiques.",
          },
        ],
      },
      {
        title: "Logiciels",
        items: [
          {
            name: "Figma",
            level: 90,
            years: 3,
            tags: ["Auto‑layout", "Design System"],
            summary: "Librairies de composants, prototypage, handoff dev.",
          },
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
    description:
      "Applications multi‑plateformes performantes avec une base de code partagée.",
    buckets: [
      {
        title: "Technologies",
        items: [
          {
            name: "React Native / Expo",
            level: 82,
            years: 2,
            tags: ["Expo", "RN CLI"],
            summary: "UI native, navigation, accès capteurs, packaging.",
          },
          {
            name: "Flutter Mobile ",
            level: 66,
            years: 1,
            tags: ["Dart", "RN CLI"],
            summary: "Widgets, état et déploiement multiplateforme.",
          },
          {
            name: "SQLite / AsyncStorage",
            level: 70,
            years: 2,
            summary: "Persistance locale, synchronisation, migrations.",
          },
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
    ],
  },
  {
    category: "Autres",
    icon: Brain,
    description:
      "Applications multi‑plateformes performantes avec une base de code partagée.",
    buckets: [
      {
        title: "Serverless",
        items: [
          {
            name: "Cloudflare Workers",
            level: 76,
            years: 2,
            tags: ["Edge", "KV"],
            summary:
              "Exécution à l'edge, KV storage, latence minimale, caching.",
          },
          {
            name: "AWS Lambda",
            level: 78,
            years: 2,
            tags: ["API GW", "S3"],
            summary:
              "APIs serverless, triggers S3/cron, intégrations managées.",
          },
          {
            name: "Supabase",
            level: 82,
            years: 2,
            tags: ["Auth", "DB", "Storage"],
            summary:
              "Postgres managé, Auth, stockage, Realtime, edge functions.",
          },
          {
            name: "Firebase",
            level: 80,
            years: 3,
            tags: ["Auth", "Firestore"],
            summary: "Auth, Firestore, hosting et functions pour MVP rapides.",
          },
        ],
      },
    ],
  },
];

// Configuration du formulaire de contact
export const contactConfig = {
  email: "pro.mailer.sender@gmail.com",
  from: "onboarding@resend.dev",
  subject: "Contact Form Submission david abraham bresom",
  resendApiKey: "re_Br1bKvYh_ATgqDuXLterQLa5C61nAq1Zf",
};
