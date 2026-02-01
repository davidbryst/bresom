import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, type Project } from "~/data/content";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { easings } from "~/hooks/useGSAP";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // === PROGRESS BAR SCRUB ===
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 0.3,
            },
          },
        );
      }

      // === DECORATIVE BLOBS WITH PARALLAX SCRUB ===
      if (decorRef.current) {
        const blobs = decorRef.current.querySelectorAll(".decor-blob");
        blobs.forEach((blob, i) => {
          // Infinite floating animation
          gsap.to(blob, {
            x: Math.sin(i) * 50,
            y: Math.cos(i) * 30,
            scale: 1.1 + Math.random() * 0.2,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Parallax scrub effect
          gsap.to(blob, {
            yPercent: -50 - i * 20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1 + i * 0.5,
            },
          });
        });
      }

      // === HEADER WITH TOGGLEACTIONS AND SCRUB ===
      if (headerRef.current) {
        const badge = headerRef.current.querySelector(".header-badge");
        const title = headerRef.current.querySelector(".header-title");
        const titleGradient =
          headerRef.current.querySelector(".title-gradient");
        const desc = headerRef.current.querySelector(".header-desc");

        // Badge with toggleActions
        gsap.fromTo(
          badge,
          { opacity: 0, y: 30, scale: 0.8, rotation: -5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: easings.elastic,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Title with scrub-based clip-path reveal
        gsap.fromTo(
          title,
          { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: easings.elastic,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Gradient text with color shift scrub
        if (titleGradient) {
          gsap.fromTo(
            titleGradient,
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "100% 50%",
              ease: easings.elastic,
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 70%",
                end: "bottom top",
                scrub: 2,
              },
            },
          );
        }

        // Description with toggleActions
        gsap.fromTo(
          desc,
          { opacity: 0, y: 20, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: easings.elastic,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // === GRID CARDS WITH SCRUB AND TOGGLEACTIONS ===
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card");

        cards.forEach((card, index) => {
          const image = card.querySelector(".project-image");
          const overlay = card.querySelector(".project-overlay");
          const overlayIcon = card.querySelector(".overlay-icon");
          const content = card.querySelector(".project-content");
          const tags = card.querySelectorAll(".project-tag");
          const arrow = card.querySelector(".project-arrow");
          const glowBar = card.querySelector(".glow-bar");
          const cardGlow = card.querySelector(".card-glow");

          // Card entrance with scrub - 3D rotation based on position
          const rotateDirection =
            index % 3 === 0 ? 15 : index % 3 === 2 ? -15 : 0;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              scale: 0.85,
              rotateX: -20,
              rotateY: rotateDirection,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                scrub: 0.3 + index * 0.1,
              },
            },
          );

          // Image parallax scrub
          gsap.to(image, {
            yPercent: -15,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          // Card glow intensity with scrub
          if (cardGlow) {
            gsap.fromTo(
              cardGlow,
              { opacity: 0 },
              {
                opacity: 0.2,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  end: "top 40%",
                  scrub: 1,
                },
              },
            );
          }

          // Tags with toggleActions - staggered entrance
          gsap.fromTo(
            tags,
            { opacity: 0, scale: 0.8, y: 10 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play reverse play reverse",
              },
            },
          );

          // Overlay icon pulse when in view
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              gsap.to(overlayIcon, {
                scale: 1.1,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
            onLeave: () => {
              gsap.killTweensOf(overlayIcon);
              gsap.set(overlayIcon, { scale: 0.8, opacity: 0 });
            },
            onLeaveBack: () => {
              gsap.killTweensOf(overlayIcon);
              gsap.set(overlayIcon, { scale: 0.8, opacity: 0 });
            },
            onEnterBack: () => {
              gsap.to(overlayIcon, {
                scale: 1.1,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          });

          // Hover animations
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -15,
              scale: 1.03,
              boxShadow: "0 30px 60px -15px rgba(124, 58, 237, 0.3)",
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1.2,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(overlay, {
              opacity: 1,
              duration: 0.3,
            });

            gsap.to(overlayIcon, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
            });

            gsap.to(tags, {
              scale: 1.08,
              borderColor: "rgba(124, 58, 237, 0.6)",
              duration: 0.3,
              stagger: 0.03,
            });

            gsap.to(arrow, {
              x: 6,
              y: -6,
              color: "#7C3AED",
              rotation: 45,
              duration: 0.3,
            });

            gsap.to(glowBar, {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out",
            });

            if (cardGlow) {
              gsap.to(cardGlow, {
                opacity: 0.4,
                duration: 0.3,
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(overlay, {
              opacity: 0,
              duration: 0.3,
            });

            gsap.to(overlayIcon, {
              scale: 0.8,
              opacity: 0,
              duration: 0.3,
            });

            gsap.to(tags, {
              scale: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              duration: 0.3,
              stagger: 0.03,
            });

            gsap.to(arrow, {
              x: 0,
              y: 0,
              color: "#8B8B9B",
              rotation: 0,
              duration: 0.3,
            });

            gsap.to(glowBar, {
              scaleX: 0,
              duration: 0.5,
              ease: "power2.out",
            });

            if (cardGlow) {
              gsap.to(cardGlow, {
                opacity: 0.2,
                duration: 0.3,
              });
            }
          });
        });
      }

      // === CTA WITH TOGGLEACTIONS ===
      if (ctaRef.current) {
        const btn = ctaRef.current.querySelector(".cta-btn");

        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          },
        );

        // Magnetic hover for CTA
        if (btn) {
          btn.addEventListener("mousemove", (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = (btn as HTMLElement).getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
              x: x * 0.25,
              y: y * 0.25,
              scale: 1.08,
              boxShadow: "0 0 50px rgba(124, 58, 237, 0.5)",
              duration: 0.3,
              ease: "power2.out",
            });
          });

          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 bg-dark-deep relative overflow-hidden"
    >
      {/* Progress bar - scrub indicator */}
      {/* <div
        ref={progressRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-accent via-violet-primary to-violet-accent z-50 origin-left"
        style={{ width: "100%" }}
      /> */}

      {/* Background decoration with parallax */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="decor-blob absolute top-1/4 left-0 w-96 h-96 bg-violet-primary/5 rounded-full blur-3xl" />
        <div className="decor-blob absolute bottom-1/4 right-0 w-96 h-96 bg-violet-primary/5 rounded-full blur-3xl" />
        <div className="decor-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-primary/3 rounded-full blur-[100px]" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#7C3AED_1px,transparent_1px),linear-gradient(180deg,#7C3AED_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
            Portfolio
          </span>
          <h2 className="header-title text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4 overflow-hidden">
            Projets{" "}
            <span
              className="title-gradient text-transparent bg-clip-text bg-gradient-violet"
              style={{ backgroundSize: "200% 100%" }}
            >
              Sélectionnés
            </span>
          </h2>
          <p className="header-desc text-light-secondary max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {projectsData.map((project: Project, index: number) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card relative bg-dark-surface rounded-2xl overflow-hidden border border-dark-border transition-colors duration-300 block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card glow effect */}
              <div
                className="card-glow absolute inset-0 opacity-0 pointer-events-none z-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.25) 0%, transparent 70%)",
                }}
              />

              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={`/projet${project.image}`}
                  alt={project.title}
                  className="project-image w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/50 to-transparent opacity-60" />

                {/* Hover overlay */}
                <div className="project-overlay absolute inset-0 bg-violet-primary/30 flex items-center justify-center opacity-0">
                  <div className="overlay-icon w-14 h-14 bg-gradient-violet rounded-full flex items-center justify-center shadow-glow-violet scale-75 opacity-0">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="project-content p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-light-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="project-arrow w-5 h-5 text-light-muted transition-all duration-300" />
                </div>

                <p className="text-light-secondary text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="project-tag px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-dark-card text-light-muted rounded-full border border-dark-border transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom glow bar */}
              <div className="glow-bar absolute bottom-0 left-0 right-0 h-1 bg-gradient-violet scale-x-0 origin-left" />
            </a>
          ))}
        </div>

        {/* CTA */}
        {/* <div ref={ctaRef} className="text-center mt-12">
          <a
            href="https://github.com/davidabraham"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn inline-flex items-center gap-2 px-8 py-4 border-2 border-dark-border text-light-primary font-semibold rounded-xl transition-all duration-300"
          >
            <span>Voir plus sur GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div> */}
      </div>
    </section>
  );
}
