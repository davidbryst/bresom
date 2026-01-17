import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { projectsData, type Project } from "~/data/content";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 md:py-32 bg-dark-deep relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Projets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Sélectionnés
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project: Project, index: number) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative bg-dark-surface rounded-2xl overflow-hidden border border-dark-border hover:border-violet-primary/50 transition-all duration-500 block"
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={`/projet${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-violet-primary/20 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 bg-gradient-violet rounded-full flex items-center justify-center shadow-glow-violet"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-light-primary group-hover:text-violet-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-light-muted group-hover:text-violet-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <p className="text-light-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, tagIndex: number) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + tagIndex * 0.1 }}
                      className="px-3 py-1 text-xs font-medium bg-dark-card text-light-muted rounded-full border border-dark-border group-hover:border-violet-primary/30 group-hover:text-violet-accent transition-all duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.a>
          ))}
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/davidabraham"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124, 58, 237, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-dark-border text-light-primary font-semibold rounded-xl hover:border-violet-primary/50 transition-all duration-300"
          >
            <span>Voir plus sur GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
