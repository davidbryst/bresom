import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, type Project } from "~/data/content";
import { ExternalLink, ArrowUpRight } from "lucide-react";

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

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate decorative blobs
      if (decorRef.current) {
        const blobs = decorRef.current.querySelectorAll(".decor-blob");
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            x: Math.sin(i) * 50,
            y: Math.cos(i) * 30,
            scale: 1.1 + Math.random() * 0.2,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // Header animation with text reveal
      if (headerRef.current) {
        const badge = headerRef.current.querySelector(".header-badge");
        const title = headerRef.current.querySelector(".header-title");
        const desc = headerRef.current.querySelector(".header-desc");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          badge,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
          .fromTo(
            title,
            { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3"
          )
          .fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          );
      }

      // Grid cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card");

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
            rotateX: -10,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: {
              each: 0.15,
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        // Individual card hover animations
        cards.forEach((card) => {
          const image = card.querySelector(".project-image");
          const overlay = card.querySelector(".project-overlay");
          const overlayIcon = card.querySelector(".overlay-icon");
          const content = card.querySelector(".project-content");
          const tags = card.querySelectorAll(".project-tag");
          const arrow = card.querySelector(".project-arrow");
          const glowBar = card.querySelector(".glow-bar");

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -12,
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)",
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1.15,
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
              scale: 1.05,
              borderColor: "rgba(124, 58, 237, 0.5)",
              duration: 0.3,
              stagger: 0.05,
            });

            gsap.to(arrow, {
              x: 4,
              y: -4,
              color: "#7C3AED",
              duration: 0.3,
            });

            gsap.to(glowBar, {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out",
            });
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
              stagger: 0.05,
            });

            gsap.to(arrow, {
              x: 0,
              y: 0,
              color: "#8B8B9B",
              duration: 0.3,
            });

            gsap.to(glowBar, {
              scaleX: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          });
        });
      }

      // CTA button animation
      if (ctaRef.current) {
        const btn = ctaRef.current.querySelector(".cta-btn");

        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Magnetic hover for CTA
        if (btn) {
          btn.addEventListener("mousemove", (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = (btn as HTMLElement).getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
              x: x * 0.2,
              y: y * 0.2,
              scale: 1.05,
              boxShadow: "0 0 40px rgba(124, 58, 237, 0.4)",
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
      {/* Background decoration */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="decor-blob absolute top-1/4 left-0 w-96 h-96 bg-violet-primary/5 rounded-full blur-3xl" />
        <div className="decor-blob absolute bottom-1/4 right-0 w-96 h-96 bg-violet-primary/5 rounded-full blur-3xl" />
        <div className="decor-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-primary/3 rounded-full blur-[100px]" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#7C3AED_1px,transparent_1px),linear-gradient(180deg,#7C3AED_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
            Portfolio
          </span>
          <h2 className="header-title text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4 overflow-hidden">
            Projets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  <h3 className="text-xl font-bold text-light-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="project-arrow w-5 h-5 text-light-muted transition-all duration-300" />
                </div>

                <p className="text-light-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="project-tag px-3 py-1 text-xs font-medium bg-dark-card text-light-muted rounded-full border border-dark-border transition-all duration-300"
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
        <div ref={ctaRef} className="text-center mt-12">
          <a
            href="https://github.com/davidabraham"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn inline-flex items-center gap-2 px-8 py-4 border-2 border-dark-border text-light-primary font-semibold rounded-xl transition-all duration-300"
          >
            <span>Voir plus sur GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
