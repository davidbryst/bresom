import { Code, Palette, Smartphone, Brain, Paintbrush } from "lucide-react";

// Types pour les données
export interface ExperienceItem {
  company: string;
  position: string;
  date: string;
  responsibilities: string[];
}

export interface FormationItem {
  ecole: string;
  diplome: string;
  date: string;
  desc?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface SkillItem {
  name: string;
  level: number;
  years: number;
  tags?: string[];
  summary?: string;
}

export interface SkillBucket {
  title: string;
  items: SkillItem[];
}

export interface DomainGroup {
  category: string;
  icon: any;
  description: string;
  buckets: SkillBucket[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

// Correction de l'interface dosInfo
export interface dosInfoItem {
  titre: string;
  description: string;
  icon: any;
}

export interface AboutInfo {
  description: string;
  points: string[];
  experience: string;
  stack: string;
  values: string;
}

export interface HeroInfo {
  greeting: string;
  name: string;
  subtitle: string;
  primaryLines: string[];
  secondaryLines: string[];
}

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
  phone: "+225 01 40 54 41 97 / +225 07 12 41 01 34",
  location: "Côte d'Ivoire, Abidjan, Cocody, Riviera 2",
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
    title: "Queen By DKloth",
    description: "E-commerce de mode féminine ivoirienne",
    image: "/queenbydklothMockup1.png",
    tags: ["Remix.js", "Supabase", "E-commerce", "Fashion"],
    link: "https://queenbydkloth.vercel.app/",
  },
  {
    title: "Fresh Afrique",
    description: "Restaurant de cuisine ivoirienne authentique",
    image: "/freshafriqueMockup1.png",
    tags: ["React", "Vite", "Restaurant", "Réservation"],
    link: "https://freshafrique.vercel.app/",
  },
  {
    title: "KoraConsult",
    description: "Conseil stratégique pour organisations",
    image: "/koraconsultMockup1.png",
    tags: ["React Router", "Vite", "Corporate", "Conseil"],
    link: "https://koraconsult.vercel.app/",
  },
  {
    title: "DavStore",
    description: "Plate-forme de commerce électronique",
    image: "/DavStoreMockup.png",
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/zTTfQHgcKZob5qFwajJuqS/DavStore?node-id=0-1&t=CXe7jUEU1ARIFB2N-1",
  },
  {
    title: "DavHotel",
    description: "Plate-forme de réservation hôtelière",
    image: "/DavHotelMockup.png",
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

export const skillsData: DomainGroup[] = [
  {
    category: "Développement Web",
    icon: Code,
    description: "Applications web performantes du front-end au back-end.",
    buckets: [
      {
        title: "Frontend",
        items: [
          { name: "Remix", level: 88, years: 2 },
          { name: "Next.js", level: 90, years: 3 },
          { name: "Angular", level: 75, years: 2 },
          { name: "TypeScript", level: 90, years: 3 },
          { name: "Tailwind CSS", level: 95, years: 3 },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: "Node.js", level: 88, years: 3 },
          { name: "Laravel", level: 92, years: 4 },
          { name: "Spring Boot", level: 85, years: 3 },
          { name: "PostgreSQL", level: 85, years: 3 },
          { name: "MongoDB", level: 80, years: 2 },
          { name: "Git", level: 92, years: 5 },
        ],
      },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    description: "Interfaces élégantes et expérience utilisateur optimale.",
    buckets: [
      {
        title: "Outils",
        items: [
          { name: "Figma", level: 92, years: 3 },
          { name: "Photoshop", level: 82, years: 4 },
          { name: "Illustrator", level: 78, years: 3 },
          { name: "Blender", level: 72, years: 3 },
          { name: "After Effects", level: 70, years: 2 },
        ],
      },
      {
        title: "Concepts",
        items: [
          { name: "UI/UX Design", level: 90, years: 3 },
          { name: "Responsive Design", level: 95, years: 3 },
          { name: "Design System", level: 85, years: 2 },
          { name: "Color Theory", level: 82, years: 3 },
          { name: "Accessibilité", level: 78, years: 2 },
          { name: "Mobile-First", level: 90, years: 3 },
        ],
      },
    ],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    description: "Applications mobiles cross-platform iOS et Android.",
    buckets: [
      {
        title: "Technologies",
        items: [
          { name: "React Native", level: 85, years: 2 },
          { name: "Expo", level: 88, years: 2 },
          { name: "Flutter", level: 70, years: 1 },
          { name: "Android Studio", level: 75, years: 2 },
          { name: "Xcode", level: 72, years: 1 },
        ],
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Brain,
    description: "Services cloud et déploiement continu.",
    buckets: [
      {
        title: "Services",
        items: [
          { name: "Supabase", level: 88, years: 2 },
          { name: "Firebase", level: 85, years: 3 },
          { name: "AWS", level: 80, years: 2 },
          { name: "Vercel", level: 88, years: 3 },
          { name: "Cloudflare", level: 82, years: 2 },
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
  // Note: La clé API Resend est maintenant chargée directement dans api.contact.tsx
  // via process.env pour éviter l'exposition côté client
};
