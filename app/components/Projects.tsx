import { Button, Typography } from "@material-tailwind/react";

const projects = [
  // {
  //   title: "Plateforme E‑commerce Headless",
  //   description: "Marketplace B2C avec catalogue, panier, paiement (Stripe), espace vendeur, search optimisée et dashboard d'administration.",
  //   image: "/logo-light.png",
  //   tags: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
  //   link: "#"
  // },
  // {
  //   title: "SaaS de Monitoring Temps‑Réel",
  //   description: "Tableau de bord temps‑réel pour métriques applicatives (web & mobile) avec ingestion via Cloudflare Workers et stockage analytique.",
  //   image: "/logo-dark.png",
  //   tags: ["Cloudflare Workers", "Supabase", "Node.js", "WebSockets"],
  //   link: "#"
  // },
  {
    title: "DavStore",
    description: "Plate-forme de commerce électronique",
    image: "/DavStore.png",
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/zTTfQHgcKZob5qFwajJuqS/DavStore?node-id=0-1&t=CXe7jUEU1ARIFB2N-1"
  },
  {
    title: "DavHotel",
    description: "Plate-forme de réservation hôtelière",
    image: "/DavHotel.png",
    tags: ["Figma", "UI/UX", "Design"],
    link: "https://www.figma.com/design/FiPEHvKORyhPGi57VmiioM/DavHotel?node-id=0-1&t=9PhqDAhIFeAcYoJc-1"
  },
  // {
  //   title: "Design System & Bibliothèque UI",
  //   description: "Design system complet (tokens, composants, documentation) accompagné d'un kit React/TS et d'exemples Figma.",
  //   image: "/favicon.ico",
  //   tags: ["Figma", "Tailwind CSS", "TypeScript", "Material UI"],
  //   link: "#"
  // },
  // {
  //   title: "Application Mobile Fitness",
  //   description: "App cross‑platform (tracking, offline sync, notifications push) avec analytics et auth, packagée via Expo / React Native.",
  //   image: "/profile.jpg",
  //   tags: ["React Native", "Expo", "SQLite", "Firebase"],
  //   link: "#"
  // },
  // {
  //   title: "API Serverless & Automation",
  //   description: "Microservices serverless pour traitement d'images, envoi d'emails transactionnels et webhooks, orchestrés par Lambda / Cloudflare Workers.",
  //   image: "/logo-light.png",
  //   tags: ["AWS Lambda", "Cloudflare Workers", "Supabase", "Node.js"],
  //   link: "#"
  // },
  // {
  //   title: "Portfolio interactif / Site entreprise",
  //   description: "Site performant, SEO friendly, SSR avec animations accessibles et gestion multi‑langues (i18n).",
  //   image: "/logo-dark.png",
  //   tags: ["Next.js", "TypeScript", "Tailwind CSS", "Accessibility"],
  //   link: "#"
  // }
];

export default function Projects() {
  return (
    <section id="Projects" aria-labelledby="projects-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Typography id="projects-title" variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Mes Projets
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project) => (
            <div 
              key={project.title} 
              className="group flex flex-col relative overflow-hidden rounded-xl border transition-all duration-300 border-white/10 hover:border-white/20 h-full"
            >
              <div
                className="h-40 sm:h-48 md:h-56 relative overflow-hidden"
                role="img"
                aria-label={project.title}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    filter: 'brightness(0.9) contrast(1.1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              
              <div className="relative p-4 sm:p-6 flex-1 flex flex-col bg-black/40 h-full text-white">
                <Typography variant="h3" className="text-lg sm:text-xl font-semibold mb-2 text-white">
                  {project.title}
                </Typography>
                <Typography className="text-gray-700 dark:text-white/80 mb-4 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </Typography>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border backdrop-blur-sm bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/10 dark:text-white/80 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  onClick={() => window.open(project.link, '_blank')}
                  className="w-full mt-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base py-2 sm:py-3"
                >
                  Voir le projet
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 