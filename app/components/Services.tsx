import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import { dosData } from "~/data/content";
import { ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import { ScrollVelocity } from "./ScrollVelocity";

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
  const bgImageMobileRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // === PROGRESS BAR SCRUB ===
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
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

      // === BACKGROUND IMAGE MOBILE ===
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (isMobile && bgImageMobileRef.current && sectionRef.current) {
        // Mobile: pin image to screen while scrolling through section
        gsap.set(bgImageMobileRef.current, { opacity: 0.4 });

        // Use scrub to translate the image as we scroll, simulating a pin effect
        gsap.to(bgImageMobileRef.current, {
          y: () => sectionRef.current!.offsetHeight - window.innerHeight,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      // === BACKGROUND IMAGE DESKTOP ===
      if (!isMobile && bgImageRef.current) {
        // Desktop: original behavior with reveal animation
        gsap.fromTo(
          bgImageRef.current,
          { opacity: 0, scale: 1.3, x: 100 },
          {
            opacity: 0.6,
            scale: 1,
            x: 0,
            duration: 1.5,
            ease: easings.smooth,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Main image parallax with 3D rotation effect
        gsap.to(bgImageRef.current, {
          yPercent: 0,
          rotateZ: 8,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Additional subtle rotation effect
        gsap.to(bgImageRef.current, {
          rotationX: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2,
          },
        });

        // Shimmer effect on image
        const shimmer = bgImageRef.current.querySelector(".image-shimmer");
        if (shimmer) {
          gsap.fromTo(
            shimmer,
            { opacity: 0, x: "-100%" },
            {
              opacity: 0.4,
              x: "200%",
              duration: 3,
              repeat: -1,
              ease: "power1.inOut",
            },
          );
        }

        // Gradient overlay animation
        const overlay = bgImageRef.current.querySelector(
          ".image-overlay-gradient",
        );
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            {
              opacity: 0.3,
              duration: 4,
              ease: "sine.inOut",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "center center",
                scrub: 1,
              },
            },
          );
        }
      }

      // === HEADER WITH TOGGLEACTIONS ===
      if (headerRef.current) {
        const label = headerRef.current.querySelector(".section-label");
        const title = headerRef.current.querySelector("h2");
        const titleGradient =
          headerRef.current.querySelector(".title-gradient");
        const subtitle = headerRef.current.querySelector("p");

        // Label with play/reverse
        gsap.fromTo(
          label,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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

        // Title with scrub-based reveal
        gsap.fromTo(
          title,
          { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
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

        // Gradient text glow effect
        if (titleGradient) {
          gsap.fromTo(
            titleGradient,
            { backgroundSize: "100% 100%" },
            {
              backgroundSize: "200% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "center center",
                scrub: 1,
              },
            },
          );
        }

        // Subtitle with toggleActions
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            filter: "blur(0px)",
            ease: easings.smooth,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // === CARDS WITH SCRUB AND TOGGLEACTIONS ===
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");

        cards.forEach((card, index) => {
          const icon = card.querySelector(".service-icon");
          const title = card.querySelector(".service-title");
          const desc = card.querySelector(".service-desc");
          const details = card.querySelectorAll(".service-detail");
          const detailIcons = card.querySelectorAll(".detail-icon");
          const arrow = card.querySelector(".service-arrow");
          const cardGlow = card.querySelector(".card-glow");

          // Card entrance with scrub - different speeds per card
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              rotateX: -20,
              rotateY: index === 0 ? 10 : index === 2 ? -10 : 0,
              scale: 0.85,
              transformOrigin: "center top",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 60%",
                scrub: 0.3 + index * 0.15, // Staggered scrub speeds
              },
            },
          );

          // Icon with toggleActions - bounces on enter/leave
          gsap.fromTo(
            icon,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: easings.bounce,
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            },
          );

          // Title and description with toggleActions
          gsap.fromTo(
            [title, desc],
            { opacity: 0, x: -30, filter: "blur(5px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.1,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );

          // Details with scrub - slide in from left
          details.forEach((detail, detailIndex) => {
            gsap.fromTo(
              detail,
              { opacity: 0, x: -40 },
              {
                opacity: 1,
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: `top ${75 - detailIndex * 5}%`,
                  end: `top ${55 - detailIndex * 5}%`,
                  scrub: 0.5,
                },
              },
            );
          });

          // Detail icons with toggleActions
          detailIcons.forEach((detailIcon, iconIndex) => {
            gsap.fromTo(
              detailIcon,
              { scale: 0, rotation: -90 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: easings.bounce,
                scrollTrigger: {
                  trigger: card,
                  start: `top ${70 - iconIndex * 5}%`,
                  toggleActions: "play reverse play reverse",
                },
              },
            );
          });

          // Card glow intensity with scrub
          if (cardGlow) {
            gsap.fromTo(
              cardGlow,
              { opacity: 0 },
              {
                opacity: 0.15,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 70%",
                  end: "top 40%",
                  scrub: 1,
                },
              },
            );
          }

          // Arrow pulse when in view
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              gsap.to(arrow, {
                x: 5,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
            onLeave: () => {
              gsap.killTweensOf(arrow);
              gsap.to(arrow, { x: 0, duration: 0.3 });
            },
            onLeaveBack: () => {
              gsap.killTweensOf(arrow);
              gsap.to(arrow, { x: 0, duration: 0.3 });
            },
            onEnterBack: () => {
              gsap.to(arrow, {
                x: 5,
                duration: 0.5,
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
              // scale: 1.03,
              boxShadow: "0 35px 70px -15px rgba(124, 58, 237, 0.25)",
              duration: 0.4,
              ease: easings.smooth,
            });
            gsap.to(icon, {
              rotation: 15,
              scale: 1.15,
              duration: 0.3,
              ease: easings.smooth,
            });
            gsap.to(cardGlow, {
              opacity: 0.3,
              duration: 0.3,
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              // scale: 1,
              boxShadow: "none",
              duration: 0.4,
              ease: easings.smooth,
            });
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: easings.smooth,
            });
            gsap.to(cardGlow, {
              opacity: 0.15,
              duration: 0.3,
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
      className=" bg-dark-deep relative overflow-clip"
    >
      {/* Progress bar - scrub indicator */}

      {/* <ScrollVelocity
        texts={["REMIX ✦", "TYPESCRIPT ✦", "SUPABASE ✦", "FIGMA ✦"]}
        velocity={50}
        numCopies={8}
        className="custom-scroll-text text-violet-primary text-6xl"
      /> */}
      {/* <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-primary via-violet-accent to-violet-primary z-50 origin-left"
        style={{ width: "100%" }}
      /> */}

      {/* Mobile: Pinned background image */}
      <div
        ref={bgImageMobileRef}
        className="md:hidden w-full h-screen opacity-0 pointer-events-none absolute top-0 left-0"
      >
        <div className="relative h-full">
          {/* Gradient overlay for depth */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-dark-deep/80 via-5% via-dark-deep/50 to-dark-deep/80 z-20" /> */}

          {/* Main image */}
          <img
            src="/profile/face-plonger.webp"
            alt="Vision stratégique"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />

          {/* Color tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/20 via-transparent to-dark-deep/40 mix-blend-overlay" />

          {/* Vignette effect */}
          {/* <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)]" /> */}
        </div>
      </div>

      {/* Desktop: Absolute positioned image */}
      <div
        ref={bgImageRef}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-2/5 lg:w-1/5 aspect-[1/2] opacity-0 pointer-events-none z-0"
      >
        <div className="relative h-full">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-l from-dark-deep/0 via-15% via-dark-deep/0 to-dark-deep/0 z-20" />

          {/* Main image */}
          <img
            src="/profile/face-plonger.webp"
            alt="Vision stratégique"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-l-3xl shadow-2xl"
            style={{ perspective: "1000px" }}
          />

          {/* Color tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/15 via-transparent to-dark-deep/30 mix-blend-overlay rounded-l-3xl" />

          {/* Enhanced glow effect with blur */}
          <div
            className="image-glow-overlay absolute inset-0 rounded-l-3xl opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124, 58, 237, 0.6) 0%, rgba(168, 85, 247, 0.3) 30%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />

          {/* Secondary glow for depth */}
          <div
            className="absolute inset-0 rounded-l-3xl pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.4) 0%, transparent 50%)",
              filter: "blur(50px)",
            }}
          />

          {/* Shimmer effect */}
          <div
            className="image-shimmer absolute inset-0 rounded-l-3xl pointer-events-none opacity-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
              filter: "blur(2px)",
            }}
          />

          {/* Animated gradient overlay */}
          <div
            className="image-overlay-gradient absolute inset-0 rounded-l-3xl pointer-events-none opacity-0"
            style={{
              background:
                "linear-gradient(45deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.1), rgba(124, 58, 237, 0.2))",
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 0%",
            }}
          />

          {/* Vignette effect */}
          <div className="absolute inset-0 rounded-l-3xl shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto mt-0 px-6 relative z-10 bg-gradient-to-b from-black via-10% via-dark-deep/50 to-dark-black py-32 sm:py-44 md:py-64">
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label text-violet-accent font-semibold text-sm tracking-wider uppercase mb-5 sm:mb-10 px-4 py-2 bg-violet-primary/10 rounded-full inline-block border border-violet-primary/20">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Ce que je peux faire pour{" "}
            <span className="title-gradient text-transparent bg-clip-text bg-gradient-violet">
              vous
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Des solutions complètes pour donner vie à vos projets digitaux
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12 sm:my-24 gap-4 sm:gap-6"
        >
          {dosData.map((service, index) => {
            const Icon = service.icon;
            const details = serviceDetails[service.titre];

            return (
              <div
                key={index}
                className="service-card group bg-dark-surface/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl border border-dark-border hover:border-violet-primary/50 transition-colors duration-500 cursor-pointer relative overflow-hidden"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                {/* Card glow effect */}
                <div
                  className="card-glow absolute inset-0 opacity-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.2) 0%, transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div className="service-icon w-11 h-11 sm:w-14 sm:h-14 bg-gradient-violet rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-glow-violet relative z-10">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>

                <h3 className="service-title text-lg sm:text-xl font-bold text-light-primary mb-2 sm:mb-3 group-hover:text-violet-accent transition-colors duration-300 relative z-10">
                  {service.titre}
                </h3>

                <p className="service-desc text-sm sm:text-base text-light-secondary mb-4 sm:mb-6 relative z-10">
                  {service.description}
                </p>

                {/* Details */}
                {details && (
                  <div className="space-y-3 sm:space-y-4 border-t border-dark-border pt-4 sm:pt-6 relative z-10">
                    <div className="service-detail flex items-start gap-3">
                      <Target className="detail-icon w-4 h-4 text-violet-accent mt-1 flex-shrink-0" />
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
                      <Lightbulb className="detail-icon w-4 h-4 text-violet-accent mt-1 flex-shrink-0" />
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
                      <TrendingUp className="detail-icon w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
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
                <div className="service-arrow mt-6 flex items-center gap-2 text-violet-accent text-sm font-semibold relative z-10">
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
