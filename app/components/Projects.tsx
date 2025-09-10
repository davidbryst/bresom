import { projectsData } from "../data/content";

export default function Projects() {
  return (
    <section id="Projects" aria-labelledby="projects-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto ">
        <h2
          id="projects-title"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white"
        >
          Mes Projets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              className="group flex flex-col relative overflow-hidden  border transition-all duration-300 cardGlass hover:border-white/20 h-full"
            >
              <div
                className="h-40 sm:h-48 md:h-56 relative overflow-hidden"
                role="img"
                aria-label={project.title}
              >
                <div
                  className={"absolute inset-0 bg-cover bg-top"}
                  style={{
                    backgroundImage: `url(${project.image})`,
                    filter: "brightness(0.9) contrast(1.1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-transparent opacity-40" />
                <div
                  className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>

              <div className="relative p-4 sm:p-6 flex-1 flex flex-col h-full text-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-white/80 mb-4 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
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
                <button
                  type="button"
                  onClick={() => window.open(project.link, "_blank")}
                  className="w-full mt-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 rounded"
                >
                  Voir le projet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}