import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
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
    solution:
      "Architecture moderne avec React/Remix, optimisation SEO, et intégration d'APIs robustes.",
    resultat:
      "+40% de performance, temps de chargement < 2s, taux de conversion amélioré.",
  },
  "Développement Mobile": {
    defi: "Déployer rapidement sur iOS et Android avec une expérience native optimale.",
    solution:
      "React Native et Expo pour un code partagé avec accès aux fonctionnalités natives.",
    resultat:
      "Réduction de 60% du temps de développement, apps publiées sur les stores.",
  },
  "Design UI/UX": {
    defi: "Concevoir des interfaces qui convertissent et fidélisent les utilisateurs.",
    solution:
      "Recherche utilisateur, wireframes, prototypage Figma et tests d'utilisabilité.",
    resultat: "+25% d'engagement utilisateur, réduction du taux de rebond.",
  },
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background image parallax
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { opacity: 0, scale: 1.2 },
          {
            opacity: 0.2,
            scale: 1,
            duration: 1.5,
            ease: easings.smooth,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        // Parallax effect
        gsap.to(bgImageRef.current.querySelector("img"), {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // Header animations
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

      // Cards animations
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");

        // Staggered reveal animation
        cards.forEach((card, index) => {
          const icon = card.querySelector(".service-icon");
          const title = card.querySelector(".service-title");
          const desc = card.querySelector(".service-desc");
          const details = card.querySelectorAll(".service-detail");
          const arrow = card.querySelector(".service-arrow");

          // Card entrance
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              rotateX: -15,
              transformOrigin: "center top",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: easings.spring,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );

          // Icon animation
          gsap.fromTo(
            icon,
            { scale: 0, rotation: -90 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.2,
              ease: easings.bounce,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );

          // Title and description
          gsap.fromTo(
            [title, desc],
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.3,
              ease: easings.smooth,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );

          // Details staggered
          gsap.fromTo(
            details,
            { opacity: 0, x: -15 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              delay: 0.5,
              ease: easings.smooth,
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
              },
            }
          );

          // Hover animations
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -12,
              scale: 1.02,
              boxShadow: "0 30px 60px -15px rgba(124, 58, 237, 0.2)",
              duration: 0.4,
              ease: easings.smooth,
            });
            gsap.to(icon, {
              rotation: 10,
              scale: 1.1,
              duration: 0.3,
              ease: easings.smooth,
            });
            gsap.to(arrow, {
              x: 8,
              duration: 0.3,
              ease: easings.smooth,
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.4,
              ease: easings.elastic,
            });
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: easings.elastic,
            });
            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: easings.elastic,
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-dark-deep relative overflow-hidden"
    >
      {/* Background image effect */}
      <div
        ref={bgImageRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-0 pointer-events-none hidden lg:block"
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-dark-deep via-transparent to-dark-deep z-10" />
          <img
            src="/profile/face-plonger.jpg"
            alt="Vision stratégique"
            className="w-full h-full object-cover rounded-l-3xl blur-[1px]"
          />
          <div className="absolute inset-0 bg-violet-primary/10 mix-blend-overlay rounded-l-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
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
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dosData.map((service, index) => {
            const Icon = service.icon;
            const details = serviceDetails[service.titre];

            return (
              <div
                key={index}
                className="service-card group bg-dark-surface/80 backdrop-blur-sm p-8 rounded-2xl border border-dark-border hover:border-violet-primary/50 transition-colors duration-500 cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                {/* Icon */}
                <div className="service-icon w-14 h-14 bg-gradient-violet rounded-xl flex items-center justify-center mb-6 shadow-glow-violet">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="service-title text-xl font-bold text-light-primary mb-3 group-hover:text-violet-accent transition-colors duration-300">
                  {service.titre}
                </h3>

                <p className="service-desc text-light-secondary mb-6">
                  {service.description}
                </p>

                {/* Details */}
                {details && (
                  <div className="space-y-4 border-t border-dark-border pt-6">
                    <div className="service-detail flex items-start gap-3">
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

                    <div className="service-detail flex items-start gap-3">
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

                    <div className="service-detail flex items-start gap-3">
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
                <div className="service-arrow mt-6 flex items-center gap-2 text-violet-accent text-sm font-semibold">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
