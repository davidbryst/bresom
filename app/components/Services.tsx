import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { dosData } from "~/data/content";
import { ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";

interface ServiceDetail {
  defi: string;
  solution: string;
  resultat: string;
}

const serviceDetails: Record<string, ServiceDetail> = {
  "Développement Web": {
    defi: "Créer des applications web performantes et scalables qui répondent aux besoins métier complexes.",
    solution: "Architecture moderne avec React/Remix, optimisation SEO, et intégration d'APIs robustes.",
    resultat: "+40% de performance, temps de chargement < 2s, taux de conversion amélioré.",
  },
  "Développement Mobile": {
    defi: "Déployer rapidement sur iOS et Android avec une expérience native optimale.",
    solution: "React Native et Expo pour un code partagé avec accès aux fonctionnalités natives.",
    resultat: "Réduction de 60% du temps de développement, apps publiées sur les stores.",
  },
  "Design UI/UX": {
    defi: "Concevoir des interfaces qui convertissent et fidélisent les utilisateurs.",
    solution: "Recherche utilisateur, wireframes, prototypage Figma et tests d'utilisabilité.",
    resultat: "+25% d'engagement utilisateur, réduction du taux de rebond.",
  },
};

export default function Services() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 md:py-32 bg-dark-deep relative overflow-hidden"
    >
      {/* Background image effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20 pointer-events-none hidden lg:block">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-dark-deep via-transparent to-dark-deep z-10" />
          <img
            src="/profile/face-plonger.jpg"
            alt="Vision stratégique"
            className="w-full h-full object-cover rounded-l-3xl opacity-60 blur-[1px]"
          />
          <div className="absolute inset-0 bg-violet-primary/10 mix-blend-overlay rounded-l-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Ce que je peux faire pour{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              vous
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Des solutions complètes pour donner vie à vos projets digitaux
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dosData.map((service, index) => {
            const Icon = service.icon;
            const details = serviceDetails[service.titre];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.15)",
                }}
                className="group bg-dark-surface/80 backdrop-blur-sm p-8 rounded-2xl border border-dark-border hover:border-violet-primary/50 transition-all duration-500"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="w-14 h-14 bg-gradient-violet rounded-xl flex items-center justify-center mb-6 shadow-glow-violet"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-light-primary mb-3 group-hover:text-violet-accent transition-colors duration-300">
                  {service.titre}
                </h3>

                <p className="text-light-secondary mb-6">
                  {service.description}
                </p>

                {/* Details */}
                {details && (
                  <div className="space-y-4 border-t border-dark-border pt-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-violet-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-light-muted uppercase tracking-wider mb-1">
                          Le Défi
                        </p>
                        <p className="text-sm text-light-secondary">
                          {details.defi}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-violet-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-light-muted uppercase tracking-wider mb-1">
                          La Solution
                        </p>
                        <p className="text-sm text-light-secondary">
                          {details.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-light-muted uppercase tracking-wider mb-1">
                          Le Résultat
                        </p>
                        <p className="text-sm text-green-400">
                          {details.resultat}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Arrow link */}
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="mt-6 flex items-center gap-2 text-violet-accent text-sm font-semibold cursor-pointer"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
