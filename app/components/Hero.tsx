import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { heroData } from "~/data/content";

const roles = heroData.primaryLines;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    hidden: { opacity: 0, scale: 0.8, rotateZ: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 2,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-deep"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-violet-accent/30 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: "100%",
              opacity: 0
            }}
            animate={{
              y: "-100%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-light-secondary text-lg md:text-xl mb-4"
            >
              {heroData.greeting}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-primary mb-6"
            >
              {heroData.name.split(" ").map((word, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-violet">
                      {word}
                    </span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-light-secondary text-lg md:text-xl mb-2"
            >
              {heroData.subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="h-12 md:h-14 mb-8 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-violet"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet transition-all duration-300"
              >
                Voir mes projets
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, borderColor: "#7C3AED" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-dark-border text-light-primary font-semibold rounded-xl hover:bg-dark-surface transition-all duration-300"
              >
                Me contacter
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image Card */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-violet-accent/20 blur-3xl rounded-full" />

              {/* Image card */}
              <div className="relative bg-dark-card p-3 rounded-3xl shadow-premium border border-dark-border overflow-hidden">
                {/* Violet overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/10 to-transparent pointer-events-none z-10 rounded-3xl" />

                <img
                  src="/profile/face-identiter-large.jpg"
                  alt="David Abraham"
                  className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-2xl"
                />

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-6 bg-dark-surface/90 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-border flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-light-secondary text-sm">Disponible</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-dark-border rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-violet-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
