import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Clock, Layers, Heart } from "lucide-react";
import { aboutData } from "~/data/content";

export default function About() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stats = [
    { icon: Clock, label: "Experience", value: aboutData.experience },
    { icon: Layers, label: "Stack", value: "Full Stack" },
    { icon: Heart, label: "Passion", value: "Design & Code" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-dark-surface relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-violet-primary/30 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-violet-primary/10 rounded-2xl blur-xl" />

              <div className="relative bg-dark-card p-2 rounded-2xl shadow-premium border border-dark-border">
                <img
                  src="/profile/face-identiter.jpg"
                  alt="David Abraham - About"
                  className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.span
              variants={itemVariants}
              className="text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block"
            >
              A propos
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-6"
            >
              Transformer les idees en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-violet">
                experiences digitales
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-light-secondary text-lg leading-relaxed mb-8"
            >
              {aboutData.description}
            </motion.p>

            {/* Bullet points */}
            <motion.ul variants={containerVariants} className="space-y-4 mb-10">
              {aboutData.points.map((point: string, index: number) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-violet-accent mt-1 flex-shrink-0" />
                  <span className="text-light-secondary">{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: "#7C3AED" }}
                  className="bg-dark-card p-4 rounded-xl border border-dark-border text-center transition-colors duration-300"
                >
                  <stat.icon className="w-6 h-6 text-violet-accent mx-auto mb-2" />
                  <p className="text-light-primary font-semibold text-sm">
                    {stat.value}
                  </p>
                  <p className="text-light-muted text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Values */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-4 bg-dark-card/50 rounded-xl border border-dark-border"
            >
              <p className="text-light-muted text-sm">
                <span className="text-violet-accent font-semibold">Mes valeurs :</span>{" "}
                {aboutData.values}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
