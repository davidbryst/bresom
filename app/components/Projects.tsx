import { Button, Typography } from "@material-tailwind/react";

const projects = [
  {
    title: "Application E-commerce",
    description: "Une application e-commerce complète avec panier, paiement et gestion des commandes",
    image: "/projects/ecommerce.jpg",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Application Mobile",
    description: "Application mobile de suivi de fitness avec statistiques et graphiques",
    image: "/projects/fitness.jpg",
    tags: ["React Native", "Firebase"],
    link: "#"
  },
  {
    title: "Site Web Portfolio",
    description: "Portfolio créatif pour un photographe professionnel",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "Tailwind CSS"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Mes Projets
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.title} 
              className="group relative overflow-hidden rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-48 relative overflow-hidden bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="relative p-6 bg-white/5">
                <Typography variant="h3" className="text-xl font-semibold mb-2 text-white">
                  {project.title}
                </Typography>
                <Typography className="text-white/80 mb-4">
                  {project.description}
                </Typography>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-sm border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
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