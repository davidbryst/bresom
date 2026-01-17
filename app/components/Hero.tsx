import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import { heroData } from "~/data/content";

const roles = heroData.primaryLines;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Animation des rôles en boucle
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animation du changement de rôle
  useEffect(() => {
    if (!roleRef.current) return;

    gsap.fromTo(
      roleRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: easings.spring }
    );
  }, [roleIndex]);

  // Animations principales au chargement
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Timeline principale
      const tl = gsap.timeline({ defaults: { ease: easings.spring } });

      // Animation du glow background
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.2,
          opacity: 0.6,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Animation des particules
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: "-100vh",
            opacity: 0,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            delay: i * 1.5,
            ease: "none",
          });
        });
      }

      // Animation du greeting
      if (greetingRef.current) {
        tl.fromTo(
          greetingRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          0.2
        );
      }

      // Animation du titre avec split text
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".title-word");
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 80,
            rotateX: -90,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: easings.spring,
          },
          0.4
        );
      }

      // Animation du subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.8
        );
      }

      // Animation du rôle container
      if (roleRef.current) {
        tl.fromTo(
          roleRef.current.parentElement,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          1
        );
      }

      // Animation des CTAs
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("a");
        tl.fromTo(
          buttons,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          1.2
        );
      }

      // Animation de l'image
      if (imageContainerRef.current && imageRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 0.8, rotateY: -15 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 1 },
          0.6
        );

        // Floating animation continue
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Animation du scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          1.5
        );

        gsap.to(scrollIndicatorRef.current.querySelector(".scroll-dot"), {
          y: 10,
          opacity: 0.3,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Parallax effect au scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: progress * 100,
              opacity: 1 - progress * 0.5,
              duration: 0.1,
            });
          }
          if (imageContainerRef.current) {
            gsap.to(imageContainerRef.current, {
              y: progress * 50,
              scale: 1 - progress * 0.1,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic effect pour les boutons
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: easings.smooth,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: easings.elastic,
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-deep"
    >
      {/* Background glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-glow opacity-50"
      />

      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-violet-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-20px",
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p
              ref={greetingRef}
              className="text-light-secondary text-lg md:text-xl mb-4"
            >
              {heroData.greeting}
            </p>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-primary mb-6 perspective-1000"
            >
              {heroData.name.split(" ").map((word, i) => (
                <span key={i} className="title-word inline-block mr-4">
                  {i === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-violet">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-light-secondary text-lg md:text-xl mb-2"
            >
              {heroData.subtitle}
            </p>

            <div className="h-12 md:h-14 mb-8 overflow-hidden">
              <span
                ref={roleRef}
                className="block text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-violet"
              >
                {roles[roleIndex]}
              </span>
            </div>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hero-cta px-8 py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)]"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hero-cta px-8 py-4 border-2 border-dark-border text-light-primary font-semibold rounded-xl hover:bg-dark-surface hover:border-violet-primary/50 transition-all duration-300"
              >
                Me contacter
              </a>
            </div>
          </div>

          {/* Hero Image Card */}
          <div
            ref={imageContainerRef}
            className="relative flex justify-center lg:justify-end"
          >
            <div ref={imageRef} className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-violet-accent/20 blur-3xl rounded-full animate-pulse" />

              {/* Image card */}
              <div className="relative bg-dark-card p-3 rounded-3xl shadow-premium border border-dark-border overflow-hidden group">
                {/* Violet overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/10 to-transparent pointer-events-none z-10 rounded-3xl transition-opacity duration-500 group-hover:opacity-50" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <img
                  src="/profile/face-identiter-large.jpg"
                  alt="David Abraham"
                  className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Status badge */}
                <div className="absolute bottom-6 left-6 bg-dark-surface/90 backdrop-blur-sm px-4 py-2 rounded-full border border-dark-border flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-light-secondary text-sm">
                    Disponible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-dark-border rounded-full flex justify-center pt-2">
          <div className="scroll-dot w-1.5 h-1.5 bg-violet-accent rounded-full" />
        </div>
      </div>
    </section>
  );
}
