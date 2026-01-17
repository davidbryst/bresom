import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { experiencesData, type ExperienceItem } from "~/data/content";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 md:py-32 bg-dark-surface relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-deep to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Parcours
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Mon{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Expérience
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Un parcours riche en collaborations et projets variés
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3 relative"
          >
            {/* Vertical line */}
            <motion.div
              variants={lineVariants}
              className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-primary via-violet-accent to-dark-border origin-top"
            />

            <div className="space-y-8">
              {experiencesData.map((exp: ExperienceItem, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                    className="absolute left-3 md:left-5 top-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-violet rounded-full flex items-center justify-center shadow-glow-violet z-10"
                  >
                    <Briefcase className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.15)",
                    }}
                    className="bg-dark-card p-6 rounded-2xl border border-dark-border hover:border-violet-primary/30 transition-all duration-500 group"
                  >
                    {/* Date badge */}
                    <div className="flex items-center gap-2 text-violet-accent text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{exp.date}</span>
                    </div>

                    {/* Company & Position */}
                    <h3 className="text-xl font-bold text-light-primary mb-1 group-hover:text-violet-accent transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className="text-light-secondary mb-4">{exp.position}</p>

                    {/* Responsibilities */}
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp: string, respIndex: number) => (
                        <motion.li
                          key={respIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: 0.5 + index * 0.2 + respIndex * 0.1,
                          }}
                          className="flex items-start gap-2 text-sm text-light-muted"
                        >
                          <ChevronRight className="w-4 h-4 text-violet-accent mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Side Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 hidden lg:block sticky top-32"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-violet-primary/20 rounded-2xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-violet-primary/10 rounded-2xl blur-2xl" />

              {/* Image card */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-dark-card p-3 rounded-3xl shadow-premium border border-dark-border overflow-hidden"
              >
                {/* Violet overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet-primary/20 to-transparent pointer-events-none z-10 rounded-3xl" />

                <img
                  src="/profile/prodile-contreplonger.jpg"
                  alt="David Abraham - Ambition"
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 bg-dark-surface/90 backdrop-blur-sm p-4 rounded-xl border border-dark-border"
                >
                  <p className="text-light-primary font-semibold text-sm">
                    Toujours en quête d'excellence
                  </p>
                  <p className="text-light-muted text-xs mt-1">
                    Passion, rigueur et innovation
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
