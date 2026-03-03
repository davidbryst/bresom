import { useRef, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import { GSAP_CONFIG, createMasterRhythm } from "~/config/gsapConfig";
import { heroData } from "~/data/content";
import TypingEffect from "./TypingEffect";

import AnimatedBackground, { GlowingParticles } from "./AnimatedBackground";
import Magnet from "./Magnet";
import CircularText from "./CircularText";
import { Download } from "lucide-react";

const roles = heroData.primaryLines;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const roleContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const glowOrb1Ref = useRef<HTMLDivElement>(null);
  const glowOrb2Ref = useRef<HTMLDivElement>(null);
  const glowOrb3Ref = useRef<HTMLDivElement>(null);

  // Animations principales au chargement
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Timeline principale
      const tl = gsap.timeline({ defaults: { ease: easings.spring } });

      // Synchronized breathing effect for glow orbs using master rhythm
      const orbsArray = [glowOrb1Ref.current, glowOrb2Ref.current, glowOrb3Ref.current].filter(Boolean);

      if (orbsArray.length > 0) {
        // Master rhythm - all orbs breathe together
        const masterTl = gsap.timeline({ repeat: -1, yoyo: true });
        masterTl.to(orbsArray, {
          scale: 1.15,
          opacity: 0.7,
          duration: GSAP_CONFIG.masterRhythm.breathDuration,
          ease: "sine.inOut",
          stagger: {
            each: 0.3,
            from: "center"
          }
        });

        // Individual movements for depth (subtle)
        if (glowOrb1Ref.current) {
          gsap.to(glowOrb1Ref.current, {
            x: 80,
            y: -50,
            duration: GSAP_CONFIG.masterRhythm.waveDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (glowOrb2Ref.current) {
          gsap.to(glowOrb2Ref.current, {
            x: -60,
            y: 70,
            duration: GSAP_CONFIG.masterRhythm.waveDuration + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
          });
        }

        if (glowOrb3Ref.current) {
          gsap.to(glowOrb3Ref.current, {
            x: 40,
            y: 40,
            duration: GSAP_CONFIG.masterRhythm.waveDuration + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2,
          });
        }
      }

      // Animation du greeting
      if (greetingRef.current) {
        tl.fromTo(
          greetingRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          0.2,
        );
      }

      // Animation du titre avec split text - Enhanced 3D
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".title-word");
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 100,
            rotateX: -90,
            rotateY: -15,
            scale: 0.9,
            transformOrigin: "center bottom",
            transformPerspective: GSAP_CONFIG.transform3D.perspective,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: GSAP_CONFIG.durations.slow,
            stagger: GSAP_CONFIG.stagger.medium,
            ease: GSAP_CONFIG.eases.smooth4,
          },
          0.4,
        );
      }

      // Animation du subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.8,
        );
      }

      // Animation du rôle container (typing effect will handle the text)
      if (roleContainerRef.current) {
        tl.fromTo(
          roleContainerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          1,
        );
      }

      // Animation des CTAs
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("a");
        tl.fromTo(
          buttons,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          1.2,
        );
      }

      // Animation de l'image
      if (imageContainerRef.current && imageRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 0.8, rotateY: -15 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 1 },
          0.6,
        );

        // Floating animation continue
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Glow pulse behind image
        const imageGlow = imageRef.current.querySelector(".image-glow");
        if (imageGlow) {
          gsap.to(imageGlow, {
            scale: 1.2,
            opacity: 0.4,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // Animation du scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          1.5,
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
          // Parallax on glow orbs
          if (glowOrb1Ref.current) {
            gsap.to(glowOrb1Ref.current, {
              y: progress * -150,
              duration: 0.1,
            });
          }
          if (glowOrb2Ref.current) {
            gsap.to(glowOrb2Ref.current, {
              y: progress * -100,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Enhanced magnetic effect for buttons with rotation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Calculate angle for rotation
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const distance = Math.sqrt(x * x + y * y);

    // Enhanced magnetic config
    const magneticStrength = GSAP_CONFIG.magnetic.strong.strength;

    gsap.to(button, {
      x: x * magneticStrength,
      y: y * magneticStrength,
      rotation: angle * 0.05, // Subtle rotation based on angle
      scale: 1.05,
      boxShadow: `0 0 ${Math.min(distance / 2, 30)}px rgba(124, 58, 237, 0.6)`,
      duration: GSAP_CONFIG.magnetic.strong.duration,
      ease: GSAP_CONFIG.magnetic.strong.ease,
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
      duration: 0.6,
      ease: GSAP_CONFIG.eases.elastic,
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-deep"
    >
      {/* Animated Background with Glow Effects */}

      <AnimatedBackground variant="combined" intensity="medium" />

      {/* Additional Glow Orbs with custom animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main glow orb - top left */}
        <div
          ref={glowOrb1Ref}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-40 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, rgba(124, 58, 237, 0.2) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Secondary glow orb - bottom right */}
        <div
          ref={glowOrb2Ref}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Accent glow orb - center */}
        <div
          ref={glowOrb3Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Glowing Particles */}
      <GlowingParticles count={15} />

      {/* Grid overlay for extra depth */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#7C3AED_1px,transparent_1px),linear-gradient(180deg,#7C3AED_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-9 items-center">
          {/* Text Content */}
          {/* <div className="text-center lg:text-left"> */}
          <div className="text-left lg:text-left">
            <p
              ref={greetingRef}
              className="text-light-secondary sm:text-lg md:text-xl sm:mb-4"
            >
              {heroData.greeting}
            </p>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-primary mb-2 sm:mb-6 perspective-1000"
            >
              {heroData.name.split(" ").map((word, i) => (
                <span key={i} className="title-word inline-block mr-2 sm:mr-4">
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
              className="text-light-secondary sm:text-lg md:text-xl sm:mb-2"
            >
              {heroData.subtitle}
            </p>

            {/* Typing Effect for Roles */}
            <div ref={roleContainerRef} className="h-12 md:h-14 mb-8">
              <TypingEffect
                texts={roles}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2500}
                className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-violet"
                loop={true}
              />
            </div>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start text-center"
            >
              <a
                href="/cv.pdf"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                download
                className="title-btn inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <Download className="w-5 h-5" />
                Télécharger mon CV
              </a>
              <a
                href="#projects"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hidden hero-cta px-8 py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)]"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hero-cta px-5 py-2.5 sm:px-7 sm:py-3 bg-violet-primary/20 border-2 border-violet-primary text-light-primary font-semibold rounded-xl hover:bg-violet-primary/30 transition-all duration-300 text-sm sm:text-base"
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
              {/* Animated glow behind image */}
              <div
                className="image-glow absolute -inset-8 rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Image card */}
              <div className="relative bg-dark-card p-3 rounded-3xl shadow-premium border border-dark-border overflow-hidden group will-animate">
                {/* Violet overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/10 to-transparent pointer-events-none z-10 rounded-3xl transition-opacity duration-500 group-hover:opacity-50" />

                {/* Enhanced shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-accent/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Additional shimmer pass on load */}
                <div className="absolute inset-0 pointer-events-none z-20 animate-shimmer opacity-40" />

                <img
                  src="/profile/face-identiter-large.jpg"
                  alt="David Abraham"
                  className="w-72 h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[26rem] object-cover object-top rounded-2xl transition-all duration-700 group-hover:scale-105 group-hover:saturate-110 will-change-transform"
                />
                <CircularText
                  text="REACT✦REMIX✦COMPONENTS✦PATTERNS✦UI/UX✦TEMPLATES✦"
                  onHover="slowDown"
                  spinDuration={20}
                  className="!absolute !left-8 !top-16 lg:!left-12 lg:!top-24  !text-violet-primary  !inset-0 custom-class w-[25em]"
                />

                {/* Status badge with glow */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-dark-surface/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-dark-border flex items-center gap-2 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-dark-deep/70 p-1.5 sm:p-2 rounded-full"
      >
        <div className="w-6 h-10 border-2 border-[#7C3AED] rounded-full flex justify-center pt-2 backdrop-blur-sm bg-dark-surface/20">
          <div className="scroll-dot w-1.5 h-1.5 bg-violet-accent rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
        </div>
      </div>
    </section>
  );
}
