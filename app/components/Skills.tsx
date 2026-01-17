import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import {
  skillsData,
  type DomainGroup,
  type SkillItem,
  type SkillBucket,
} from "~/data/content";
import { ChevronDown } from "lucide-react";

const techIcons: Record<string, string> = {
  "React / Next.js / Remix / Angular": "⚛️",
  "Node.js / Express / Nest": "🟢",
  "Spring Boot": "🍃",
  Laravel: "🔴",
  "Tailwind CSS": "🎨",
  "SQL / PostgreSQL": "🐘",
  MongoDB: "🍃",
  "Git / GitHub": "📦",
  Postman: "📮",
  "UI/UX Design": "🎯",
  "Material UI / System": "🧩",
  "Responsive Design": "📱",
  Accessibilité: "♿",
  Figma: "🎨",
  "Adobe XD": "✨",
  Photoshop: "📷",
  Illustrator: "✏️",
  Blender: "🎬",
  "React Native / Expo": "📱",
  "Flutter Mobile ": "💙",
  "SQLite / AsyncStorage": "💾",
  "Android Studio": "🤖",
  Xcode: "🍎",
  "Expo Go": "📲",
  "Cloudflare Workers": "☁️",
  "AWS Lambda": "🔶",
  Supabase: "⚡",
  Firebase: "🔥",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initial animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const label = headerRef.current.querySelector(".section-label");
        const title = headerRef.current.querySelector("h2");
        const subtitle = headerRef.current.querySelector("p");

        gsap.fromTo(
          label,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: easings.smooth,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        gsap.fromTo(
          title,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: easings.spring,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );

        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: easings.smooth,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }

      // Tabs animation
      if (tabsRef.current) {
        const tabs = tabsRef.current.querySelectorAll("button");
        gsap.fromTo(
          tabs,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: easings.spring,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Content animation when category changes
  useEffect(() => {
    if (!contentRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animate content change
      const description = contentRef.current?.querySelector(".category-desc");
      const buckets = contentRef.current?.querySelectorAll(".skill-bucket");
      const skillCards = contentRef.current?.querySelectorAll(".skill-card");

      // Description animation
      if (description) {
        gsap.fromTo(
          description,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: easings.smooth }
        );
      }

      // Buckets animation
      if (buckets) {
        gsap.fromTo(
          buckets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: easings.spring,
          }
        );
      }

      // Skill cards animation
      if (skillCards) {
        gsap.fromTo(
          skillCards,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: easings.spring,
            delay: 0.2,
          }
        );

        // Progress bars animation
        skillCards.forEach((card) => {
          const progressBar = card.querySelector(".progress-bar");
          if (progressBar) {
            const width = progressBar.getAttribute("data-level") || "0";
            gsap.fromTo(
              progressBar,
              { width: "0%" },
              {
                width: `${width}%`,
                duration: 1,
                delay: 0.5,
                ease: easings.expoInOut,
              }
            );
          }
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Tab click handler with animation
  const handleTabClick = (index: number) => {
    if (index === activeCategory) return;

    // Animate out current content
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: easings.smooth,
        onComplete: () => {
          setActiveCategory(index);
        },
      });
    } else {
      setActiveCategory(index);
    }
  };

  // Skill card hover handler
  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".skill-icon");

    if (isEntering) {
      gsap.to(card, {
        y: -6,
        scale: 1.02,
        boxShadow: "0 15px 40px -10px rgba(124, 58, 237, 0.25)",
        duration: 0.3,
        ease: easings.smooth,
      });
      gsap.to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.3,
        ease: easings.smooth,
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "none",
        duration: 0.4,
        ease: easings.elastic,
      });
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: easings.elastic,
      });
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 bg-dark-surface relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Competences
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Technologies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Outils
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Un ensemble de compétences techniques variées pour répondre à tous
            vos besoins
          </p>
        </div>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillsData.map((category: DomainGroup, index: number) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-gradient-violet text-white shadow-glow-violet"
                    : "bg-dark-card text-light-secondary border border-dark-border hover:border-violet-primary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{category.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Content */}
        <div ref={contentRef} key={activeCategory}>
          <p className="category-desc text-center text-light-secondary mb-10 max-w-xl mx-auto">
            {skillsData[activeCategory].description}
          </p>

          {/* Buckets */}
          <div className="space-y-8">
            {skillsData[activeCategory].buckets.map(
              (bucket: SkillBucket, bucketIndex: number) => (
                <div
                  key={bucketIndex}
                  className="skill-bucket bg-dark-card/50 rounded-2xl border border-dark-border p-6"
                >
                  <h4 className="text-lg font-semibold text-light-primary mb-6 flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-violet-accent" />
                    {bucket.title}
                  </h4>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {bucket.items.map(
                      (skill: SkillItem, skillIndex: number) => (
                        <div
                          key={skillIndex}
                          className="skill-card bg-dark-surface p-4 rounded-xl border border-dark-border transition-all duration-300 group cursor-pointer"
                          onMouseEnter={(e) => handleCardHover(e, true)}
                          onMouseLeave={(e) => handleCardHover(e, false)}
                        >
                          {/* Header with icon and name */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="skill-icon text-2xl">
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
                            <div
                              className="progress-bar h-full bg-gradient-violet rounded-full"
                              data-level={skill.level}
                              style={{ width: "0%" }}
                            />
                          </div>

                          {/* Tags */}
                          {skill.tags && (
                            <div className="flex flex-wrap gap-1">
                              {skill.tags
                                .slice(0, 3)
                                .map((tag: string, tagIndex: number) => (
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
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
