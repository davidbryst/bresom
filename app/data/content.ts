import {
  Code,
  Palette,
  Smartphone,
  Paintbrush,
  Server,
  Database,
  Bot,
  Wallet,
  type LucideIcon,
} from "lucide-react";

// Types pour les données
export interface ExperienceItem {
  company: string;
  position: string;
  date: string;
  responsibilities: string[];
}

export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  summary: string;
  image: string;
  /** Overrides `image` for the homepage grid card only; detail page keeps `image`. */
  cardImage?: string;
  gallery?: string[];
  tags: string[];
  /** Live site — omit for apps that only ship as a download (see apk). */
  link?: string;
  apk?: {
    url: string;
    version: string;
    size: string;
  };
  role: string;
  highlights: string[];
  /** Badge affiché sur la carte : nature du projet. */
  status?: "Client" | "Personnel" | "Concept";
}

export interface SkillItem {
  name: string;
}

export interface SkillBucket {
  title: string;
  items: SkillItem[];
}

export interface DomainGroup {
  category: string;
  icon: LucideIcon;
  description: string;
  buckets: SkillBucket[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  /** Numéro international sans espaces ni « + », pour wa.me */
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface dosInfoItem {
  titre: string;
  description: string;
  icon: LucideIcon;
  /** Prix d'appel affiché, ex. « À partir de 200 000 FCFA » */
  price: string;
}

export interface ProcessStep {
  titre: string;
  description: string;
}

export interface AboutInfo {
  /** Accroche du hero (orientée client). */
  pitch: string;
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
  pitch:
    "Je conçois et livre vos applications web et mobiles, de la maquette Figma à la mise en production. Un seul interlocuteur pour le design, le code et le déploiement.",
  description:
    "Développeur full-stack et designer UI/UX avec 3+ ans d'expérience. Je conçois et livre des produits web et mobiles fiables, performants et élégants, de la maquette Figma à la mise en production. J'aime transformer des idées en interfaces utiles, accessibles et modernes.",
  points: [
    "Design + code : un seul interlocuteur, de la maquette au déploiement.",
    "Paiement mobile (CinetPay : Orange, MTN, Moov, Wave), géolocalisation et suivi GPS.",
    "Livraison jusqu'en production : Docker, CI/CD, VPS Linux, Vercel.",
  ],
  experience: "3+ ans",
  stack: "Flutter, React, Next.js, Laravel, Supabase",
  values: "Qualité, simplicité, professionnalisme",
};

export const contactData: ContactInfo = {
  email: "sh.david.abraham@gmail.com",
  phone: "+225 01 40 54 41 97",
  whatsapp: "2250140544197",
  location: "Abidjan, Côte d'Ivoire",
  linkedin: "https://www.linkedin.com/in/abraham-david-8831761b8/",
  github: "https://github.com/davidbryst",
};

// Offres (section « Offres ») — prix d'appel indicatifs, en FCFA.
export const dosData: dosInfoItem[] = [
  {
    titre: "Site vitrine",
    description:
      "Site professionnel rapide et responsive, jusqu'à 5 pages, formulaire de contact, SEO de base et mise en ligne. Livré en 2 à 3 semaines.",
    price: "À partir de 200 000 FCFA",
    icon: Code,
  },
  {
    titre: "Application web & mobile",
    description:
      "Application sur-mesure (Flutter, React, Next.js) : maquettes Figma, back-end, base de données, déploiement. Sur devis après un premier appel.",
    price: "À partir de 800 000 FCFA",
    icon: Smartphone,
  },
  {
    titre: "Paiement mobile",
    description:
      "Intégration CinetPay sur votre site ou application : Orange Money, MTN, Moov, Wave et carte bancaire, avec suivi des transactions.",
    price: "À partir de 150 000 FCFA",
    icon: Wallet,
  },
  {
    titre: "Design UI/UX",
    description:
      "Maquettes Figma haute-fidélité, design system et prototype cliquable pour valider votre produit avant le développement.",
    price: "À partir de 150 000 FCFA",
    icon: Paintbrush,
  },
];

export const processData: ProcessStep[] = [
  { titre: "Appel", description: "On cadre le besoin, le budget et le délai." },
  { titre: "Maquette", description: "Vous validez le design avant tout code." },
  { titre: "Développement", description: "Livraisons régulières, retours intégrés." },
  { titre: "Mise en ligne", description: "Déploiement, prise en main et suivi." },
];

const PROJECT_ROLE = "Développeur Full-Stack & Designer UI/UX";

export const projectsData: Project[] = [
  {
    title: "Olfy",
    slug: "olfy",
    category: "Application mobile",
    description: "Annuaire géolocalisé des bonnes adresses de Côte d'Ivoire",
    summary:
      "Application mobile Flutter — annuaire géolocalisé des bonnes adresses de Côte d'Ivoire : recherche par quartier, fiches établissements vérifiées, avis et itinéraire, avec une identité mono-accent Ember pensée pour le marché ivoirien.",
    image: "/olfy/olfyCover.webp",
    cardImage: "/olfy/olfyMockup.webp",
    gallery: [
      "/olfy/olfyMockup.webp",
      "/olfy/details.webp",
      "/olfy/research.webp",
      "/olfy/onboarding.webp",
      "/olfy/profile.webp",
    ],
    tags: ["Flutter", "Dart", "Mobile", "Géolocalisation"],
    apk: { url: "/apk/olfy.apk", version: "1.0.0", size: "52 Mo" },
    role: PROJECT_ROLE,
    highlights: [
      "Parcours complet : onboarding, connexion, permission de localisation, coquille à 4 onglets",
      "Fiche établissement détaillée : galerie, actions rapides, itinéraire, commande de véhicule, avis",
      "Course en temps réel avec widget flottant draggable et ETA",
      "Messagerie intégrée, favoris, profil et vote de confiance communautaire",
    ],
  },
  {
    title: "Queen By DKloth",
    slug: "queen-by-dkloth",
    category: "E-commerce",
    description: "E-commerce de mode féminine ivoirienne",
    summary:
      "Boutique en ligne pour une marque de mode féminine ivoirienne : navigation par collections, fiches produits soignées et tunnel d'achat pensé pour convertir, du choix de l'article jusqu'au paiement.",
    image: "/queen-by-dkloth/hero.webp",
    gallery: ["/queen-by-dkloth/gallery-1.webp"],
    tags: ["Remix.js", "Supabase", "E-commerce", "Fashion"],
    link: "https://queenbydkloth.vercel.app/",
    role: PROJECT_ROLE,
    highlights: [
      "Catalogue produits et gestion des collections via Supabase",
      "Tunnel d'achat (panier, paiement, suivi de commande) optimisé mobile",
      "Interface Remix.js rapide, pensée pour le SEO et la conversion",
    ],
  },
  {
    title: "Fresh Afrique",
    slug: "fresh-afrique",
    category: "Site vitrine & réservation",
    description: "Restaurant de cuisine ivoirienne authentique",
    summary:
      "Vitrine digitale pour un restaurant de cuisine ivoirienne : présentation du menu, ambiance de la salle et prise de réservation en ligne, pour transformer la visite du site en réservation.",
    image: "/fresh-afrique/hero.webp",
    gallery: ["/fresh-afrique/gallery-1.webp"],
    tags: ["React", "Vite", "Restaurant", "Réservation"],
    link: "https://freshafrique.vercel.app/",
    role: PROJECT_ROLE,
    highlights: [
      "Présentation du menu et mise en avant des spécialités maison",
      "Système de réservation en ligne intégré",
      "Base React + Vite légère et rapide au chargement",
    ],
  },
  {
    title: "KoraConsult",
    slug: "koraconsult",
    category: "Site institutionnel",
    description: "Conseil stratégique pour organisations",
    summary:
      "Site institutionnel pour un cabinet de conseil stratégique : présentation de l'offre, des domaines d'expertise et des équipes, avec une identité sobre et professionnelle adaptée à une clientèle corporate.",
    image: "/koraconsult/hero.webp",
    gallery: ["/koraconsult/gallery-1.webp"],
    tags: ["React Router", "Vite", "Corporate", "Conseil"],
    link: "https://koraconsult.vercel.app/",
    role: PROJECT_ROLE,
    highlights: [
      "Architecture multi-pages avec React Router",
      "Présentation claire de l'offre et des domaines d'expertise",
      "Design sobre et institutionnel, orienté crédibilité",
    ],
  },
  {
    title: "DavStore",
    slug: "davstore",
    status: "Concept",
    category: "Design UI/UX",
    description: "Plate-forme de commerce électronique",
    summary:
      "Conception UI/UX complète d'une plateforme e-commerce : parcours d'achat, fiches produits et espace client maquettés sur Figma, avant tout développement, pour valider l'expérience utilisateur en amont.",
    image: "/davstore/davstoreCover.webp",
    cardImage: "/davstore/hero.webp",
    gallery: [
      "/davstore/hero.webp",
      "/davstore/home.webp",
      "/davstore/detail.webp",
      "/davstore/checkout.webp",
    ],
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/zTTfQHgcKZob5qFwajJuqS/DavStore?node-id=0-1&t=CXe7jUEU1ARIFB2N-1",
    role: PROJECT_ROLE,
    highlights: [
      "Maquettes haute-fidélité du parcours d'achat de bout en bout",
      "Système de composants réutilisables dans Figma",
      "Travail sur la hiérarchie visuelle et l'accessibilité des contrastes",
    ],
  },
  {
    title: "DavHotel",
    slug: "davhotel",
    status: "Concept",
    category: "Design UI/UX",
    description: "Plate-forme de réservation hôtelière",
    summary:
      "Conception UI/UX d'une plateforme de réservation hôtelière : recherche de chambres, fiches établissements et tunnel de réservation, pensés pour rassurer le voyageur à chaque étape.",
    image: "/davhotel/davhotelCover.webp",
    cardImage: "/davhotel/hero.webp",
    gallery: [
      "/davhotel/hero.webp",
      "/davhotel/home.webp",
      "/davhotel/detail.webp",
      "/davhotel/schedule.webp",
    ],
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/FiPEHvKORyhPGi57VmiioM/DavHotel?node-id=0-1&t=9PhqDAhIFeAcYoJc-1",
    role: PROJECT_ROLE,
    highlights: [
      "Parcours de recherche et de réservation de chambres",
      "Fiches établissements détaillées (photos, équipements, avis)",
      "Design system Figma dédié à l'univers hôtelier",
    ],
  },
  {
    title: "Beats d'Éléphants",
    slug: "beats-delephants",
    category: "Plateforme musicale",
    description: "Plate-forme de musique : trap, afro, drill, boombap.",
    summary:
      "Plateforme de découverte et de diffusion d'instrumentaux (trap, afro, drill, boombap) : catalogue de beats écoutables en ligne, pensé pour les artistes et producteurs à la recherche de leur prochain son.",
    image: "/beats-delephants/hero.webp",
    gallery: ["/beats-delephants/gallery-1.webp"],
    tags: ["Remix.js", "beats", "musique ", "drill"],
    link: "https://beatsdelephants.vercel.app/",
    role: PROJECT_ROLE,
    highlights: [
      "Lecteur audio intégré pour prévisualiser les beats",
      "Catalogue filtrable par genre (trap, afro, drill, boombap)",
      "Interface Remix.js rapide adaptée à la découverte musicale",
    ],
  },
];

export const experiencesData: ExperienceItem[] = [
  {
    company: "SOBRE GOLDEN COMPANY (SGC)",
    position: "Responsable Technique & Digital",
    date: "2026 · MISSION",
    responsibilities: [
      "Pilotage technique et digital de la marque (immobilier & formation) : site web Laravel, design system et charte graphique, supports visuels.",
    ],
  },
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

const items = (...names: string[]): SkillItem[] =>
  names.map((name) => ({ name }));

// Domaines de compétences — alignés sur le CV (pas de niveaux chiffrés).
export const skillsData: DomainGroup[] = [
  {
    category: "Mobile",
    icon: Smartphone,
    description: "Applications iOS et Android, cross-platform et natives.",
    buckets: [
      {
        title: "Technologies",
        items: items("Flutter / Dart", "React Native / Expo", "Android natif (Kotlin / Java)"),
      },
    ],
  },
  {
    category: "Web",
    icon: Code,
    description: "Sites et applications web rapides, accessibles et bien référencés.",
    buckets: [
      {
        title: "Front-end",
        items: items("React", "Next.js", "Remix", "Angular", "TypeScript", "Tailwind CSS", "WordPress / CMS"),
      },
    ],
  },
  {
    category: "Back-end & données",
    icon: Database,
    description: "API, logique métier et bases de données, y compris en temps réel.",
    buckets: [
      {
        title: "Back-end",
        items: items("PHP / Laravel", "Node.js (Express, NestJS)", "Java / Spring Boot"),
      },
      {
        title: "Données",
        items: items("PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Redis"),
      },
    ],
  },
  {
    category: "DevOps & systèmes",
    icon: Server,
    description: "Déploiement, hébergement et sécurité, du VPS au cloud.",
    buckets: [
      {
        title: "Déploiement & cloud",
        items: items("Docker", "CI/CD", "VPS Linux (Coolify, Nginx)", "AWS / GCP / Azure", "Vercel"),
      },
      {
        title: "Systèmes & sécurité",
        items: items("Administration Linux", "Windows / Active Directory", "Sécurité applicative"),
      },
    ],
  },
  {
    category: "IA & intégrations",
    icon: Bot,
    description: "Paiement mobile, géolocalisation et automatisation par l'IA.",
    buckets: [
      {
        title: "Intégrations",
        items: items("CinetPay (Orange, MTN, Moov, Wave)", "Suivi GPS (Flespi)", "Google Maps"),
      },
      {
        title: "IA & data",
        items: items("LLM, RAG et agents (Ollama)", "Machine learning", "Scraping et automatisation"),
      },
    ],
  },
  {
    category: "Design & méthode",
    icon: Palette,
    description: "Du branding au design system, avec une conduite de projet rigoureuse.",
    buckets: [
      {
        title: "Design",
        items: items("UI/UX et design systems (Figma)", "Branding, logo et print", "3D (Blender)"),
      },
      {
        title: "Méthode & gestion",
        items: items("Tests unitaires et E2E", "Agile / Scrum", "Cahiers des charges", "Pilotage de projet"),
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
