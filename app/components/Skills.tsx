import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { skillsData, type DomainGroup, type SkillItem, type SkillBucket } from "~/data/content";
import { ChevronDown } from "lucide-react";

// Icônes/logos pour les technologies populaires
const techIcons: Record<string, string> = {
  "React / Next.js / Remix / Angular": "⚛️",
  "Node.js / Express / Nest": "🟢",
  "Spring Boot": "🍃",
  "Laravel": "🔴",
  "Tailwind CSS": "🎨",
  "SQL / PostgreSQL": "🐘",
  "MongoDB": "🍃",
  "Git / GitHub": "📦",
  "Postman": "📮",
  "UI/UX Design": "🎯",
  "Material UI / System": "🧩",
  "Responsive Design": "📱",
  "Accessibilité": "♿",
  "Figma": "🎨",
  "Adobe XD": "✨",
  "Photoshop": "📷",
  "Illustrator": "✏️",
  "Blender": "🎬",
  "React Native / Expo": "📱",
  "Flutter Mobile ": "💙",
  "SQLite / AsyncStorage": "💾",
  "Android Studio": "🤖",
  "Xcode": "🍎",
  "Expo Go": "📲",
  "Cloudflare Workers": "☁️",
  "AWS Lambda": "🔶",
  "Supabase": "⚡",
  "Firebase": "🔥",
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 md:py-32 bg-dark-surface relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Competences
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Technologies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Outils
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Un ensemble de compétences techniques variées pour répondre à tous vos besoins
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillsData.map((category: DomainGroup, index: number) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-gradient-violet text-white shadow-glow-violet"
                    : "bg-dark-card text-light-secondary border border-dark-border hover:border-violet-primary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{category.category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Category Content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.p
            className="text-center text-light-secondary mb-10 max-w-xl mx-auto"
          >
            {skillsData[activeCategory].description}
          </motion.p>

          {/* Buckets */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {skillsData[activeCategory].buckets.map((bucket: SkillBucket, bucketIndex: number) => (
              <motion.div
                key={bucketIndex}
                variants={itemVariants}
                className="bg-dark-card/50 rounded-2xl border border-dark-border p-6"
              >
                <h4 className="text-lg font-semibold text-light-primary mb-6 flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 text-violet-accent" />
                  {bucket.title}
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {bucket.items.map((skill: SkillItem, skillIndex: number) => (
                    <motion.div
                      key={skillIndex}
                      variants={itemVariants}
                      whileHover={{
                        y: -4,
                        borderColor: "#7C3AED",
                        boxShadow: "0 10px 30px -10px rgba(124, 58, 237, 0.2)",
                      }}
                      className="bg-dark-surface p-4 rounded-xl border border-dark-border transition-all duration-300 group"
                    >
                      {/* Header with icon and name */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">
                          {techIcons[skill.name] || "💻"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-light-primary truncate group-hover:text-violet-accent transition-colors">
                            {skill.name}
                          </h5>
                          <p className="text-xs text-light-muted">
                            {skill.years} an{skill.years > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 bg-dark-deep rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className="h-full bg-gradient-violet rounded-full"
                        />
                      </div>

                      {/* Tags */}
                      {skill.tags && (
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="text-[10px] px-2 py-0.5 bg-violet-primary/10 text-violet-accent rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Summary on hover */}
                      {skill.summary && (
                        <p className="text-xs text-light-muted mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {skill.summary}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
