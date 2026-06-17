import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import { CheckCircle, Clock, Layers, Heart } from "lucide-react";
import { aboutData } from "~/data/content";
import CircularText from "./CircularText";
import ScrollVelocity from "./ScrollVelocity";

const stats = [
  { icon: Clock, label: "Experience", value: aboutData.experience },
  { icon: Layers, label: "Stack", value: "Full Stack" },
  { icon: Heart, label: "Passion", value: "Design & Code" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const pointsRef = useRef<HTMLUListElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // === PROGRESS BAR SCRUB ANIMATION ===
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
              scrub: 0.5, // Smooth scrub
            },
          },
        );
      }

      // === IMAGE WITH ADVANCED SCRUB ===
      if (imageRef.current) {
        // Decorative elements with toggleActions
        const decorElements =
          imageRef.current.querySelectorAll(".decor-element");
        gsap.fromTo(
          decorElements,
          { opacity: 0, scale: 0.5, rotation: -45 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.2,
            ease: easings.elastic,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 70%",
              end: "top 20%",
              toggleActions: "play none none reverse", // play on enter, reverse on leave
            },
          },
        );

        // Image reveal with clip-path - toggleActions for replay
        gsap.fromTo(
          imageRef.current.querySelector(".image-wrapper"),
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 0.8,
            ease: easings.expoInOut,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // 3D rotation scrub effect on image
        gsap.to(imageRef.current.querySelector(".image-wrapper"), {
          rotateY: 10,
          rotateX: -5,
          scale: 1.05,
          ease: easings.elastic,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Parallax effect on image - smooth scrub
        gsap.to(imageRef.current.querySelector("img"), {
          yPercent: -10,
          ease: easings.elastic,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, // Slower scrub for smooth parallax
          },
        });

        // Glow intensity based on scroll
        const glow = imageRef.current.querySelector(".image-glow");
        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 0.6,
              scale: 1.2,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 80%",
                end: "center center",
                scrub: 1,
              },
            },
          );
        }
      }

      // === TITLE WITH TOGGLEACTIONS ===
      if (titleRef.current) {
        const badge = titleRef.current.querySelector(".header-badge");
        // const titleSpan = titleRef.current.querySelector(".title-label");
        const titleText = titleRef.current.querySelector(".title-text");

        // Label with play/reverse on scroll
        // gsap.fromTo(
        //   titleSpan,
        //   { width: 0, opacity: 0, x: -20 },
        //   {
        //     width: "auto",
        //     opacity: 1,
        //     x: 0,
        //     duration: 0.8,
        //     ease: easings.expo,
        //     scrollTrigger: {
        //       trigger: sectionRef.current,
        //       start: "top 70%",
        //       end: "top 40%",
        //       toggleActions: "play none none reverse",
        //     },
        //   },
        // );

        // Title text with character-like reveal
        if (titleText) {
          gsap.fromTo(
            titleText,
            { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.7,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        // Badge text with character-like reveal
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }
      if (titleRef2.current) {
        const badge = titleRef2.current.querySelector(".header-badge");
        // const titleSpan = titleRef2.current.querySelector(".title-label");
        const titleText = titleRef2.current.querySelector(".title-text");
        const textdesk = titleRef2.current.querySelector(".text-desk");

        // Label with play/reverse on scroll
        // gsap.fromTo(
        //   titleSpan,
        //   { width: 0, opacity: 0, x: -20 },
        //   {
        //     width: "auto",
        //     opacity: 1,
        //     x: 0,
        //     duration: 0.8,
        //     ease: easings.expo,
        //     scrollTrigger: {
        //       trigger: sectionRef.current,
        //       start: "top 70%",
        //       end: "top 40%",
        //       toggleActions: "play none none reverse",
        //     },
        //   },
        // );

        // Title text with character-like reveal
        if (titleText) {
          gsap.fromTo(
            titleText,
            { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.7,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: titleRef2.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        // Badge text with character-like reveal
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: titleRef2.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
        if (textdesk) {
          // Scrub-based opacity and blur
          gsap.fromTo(
            textdesk,
            { opacity: 0, y: 30, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: easings.elastic,
              scrollTrigger: {
                trigger: textdesk,
                start: "top 85%",
                end: "top 60%",
                scrub: 0.8,
                toggleActions: "play none reverse none",
              },
            },
          );
        }
      }

      // === DESCRIPTION WITH SCRUB OPACITY ===
      if (descriptionRef.current) {
        // Scrub-based opacity and blur
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: easings.elastic,
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.8,
              toggleActions: "play none reverse none",
            },
          },
        );
      }

      // === POINTS WITH STAGGERED TOGGLEACTIONS ===
      if (pointsRef.current) {
        const points = pointsRef.current.querySelectorAll("li");

        points.forEach((point, index) => {
          const icon = point.querySelector("svg");
          const text = point.querySelector("span");

          // Point entrance with toggleActions
          gsap.fromTo(
            point,
            { opacity: 0, x: -40, filter: "blur(4px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.6,
              ease: easings.spring,
              scrollTrigger: {
                trigger: point,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none reverse",
              },
            },
          );

          // Icon with bounce and toggleActions
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: easings.bounce,
                scrollTrigger: {
                  trigger: point,
                  start: "top 80%",
                  toggleActions: "play reverse play reverse",
                },
              },
            );
          }
        });
      }

      // === STATS WITH SCRUB SCALE ===
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll(".stat-card");

        // Scrub-based entrance
        statCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              scale: 0.8,
              rotateX: -20,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 85%",
                scrub: 0.5 + index * 0.2, // Staggered scrub speeds
              },
            },
          );

          // Counter animation on scroll into view
          const valueEl = card.querySelector(".stat-value");
          if (valueEl) {
            const originalText = valueEl.textContent || "";
            const hasNumber = /\d/.test(originalText);

            if (hasNumber) {
              ScrollTrigger.create({
                trigger: card,
                start: "top 50%",
                onEnter: () => {
                  // Animate the text appearance
                  gsap.fromTo(
                    valueEl,
                    { opacity: 0, scale: 0.5 },
                    {
                      opacity: 1,
                      scale: 1,
                      duration: 0.5,
                      ease: "back.out(1.7)",
                    },
                  );
                },
                onLeaveBack: () => {
                  gsap.to(valueEl, { opacity: 0, scale: 0.5, duration: 0.3 });
                },
              });
            }
          }
        });

        // Hover animation setup for stat cards
        statCards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.3)",
              duration: 0.3,
              ease: easings.smooth,
            });
            gsap.to(card.querySelector("svg"), {
              scale: 1.2,
              rotation: 10,
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
            gsap.to(card.querySelector("svg"), {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: easings.elastic,
            });
          });
        });
      }

      // === VALUES WITH TOGGLEACTIONS ===
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current,
          { opacity: 0, y: 30, scale: 0.95, borderColor: "transparent" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            borderColor: "rgba(124, 58, 237, 0.3)",
            duration: 0.8,
            ease: easings.spring,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 98%",
              end: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 sm:py-44 md:py-64 bg-dark-surface relative overflow-hidden"
    >
      {/* Progress bar - scrub indicator */}
      {/* <div
        ref={progressRef}
        className=" hidden top-0 left-0 h-1 bg-gradient-violet z-50 origin-left"
        style={{ width: "100%" }}
      /> */}

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-glow opacity-30 pointer-events-none" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#7C3AED_1px,transparent_1px),linear-gradient(180deg,#7C3AED_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-6">
        <div
          ref={titleRef2}
          className="flex 2xl:hidden flex-col items-center mb-8"
        >
          <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-5 sm:mb-10 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
            A propos
          </span>

          <h2 className="title-text text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-6 ">
            Transformer les idees en <br />
            <span className="text-transparent bg-clip-text bg-gradient-violet title-label">
              experiences digitales
            </span>
          </h2>
          <p className="text-desk text-light-secondary text-lg leading-relaxed mb-8 lg:px-12">
            {aboutData.description}
          </p>
        </div>

        <div
          ref={pinContainerRef}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image */}
          <div
            ref={imageRef}
            className="relative flex flex-col items-center justify-center lg:justify-start order-2 lg:order-1"
            style={{ perspective: "1000px" }}
          >
            <div className="relative">
              {/* Animated glow behind image */}
              <div
                className="image-glow absolute -inset-8 rounded-full opacity-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Decorative elements */}
              <div className="decor-element absolute -top-4 -left-4 w-24 h-24 border-4 border-violet-primary/70 rounded-2xl" />
              <div className="decor-element absolute -bottom-4 -right-4 w-32 h-32 bg-violet-primary/10 rounded-2xl blur-xl" />
              <div className="decor-element absolute top-1/2 -right-8 w-4 h-4 bg-violet-accent rounded-full" />

              <div className="bg-dark-card p-2 rounded-2xl shadow-premium border border-dark-border">
                <div
                  className="image-wrapper relative rounded-2xl overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* <img
                    src="/profile/s-face-identiter.png"
                    alt="David Abraham - About"
                    className="absolute z-20 w-72 h-80 md:w-80 md:h-96 2xl:w-[25rem] 2xl:h-[27rem] object-cover rounded-xl"
                  /> */}
                  <img
                    src="/profile/face-identiter.webp"
                    alt="David Abraham - About"
                    loading="lazy"
                    decoding="async"
                    className="w-72 h-80 md:w-80 md:h-96 2xl:w-[25rem] 2xl:h-[27rem] object-cover rounded-xl"
                  />
                  {/* Overlay gradient */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-violet-primary via-violet-primary/5 to-violet-primary/20 from-20% pointer-events-none" /> */}

                  <CircularText
                    text="NODE.JS✦TYPESCRIPT✦SUPABASE✦FIGMA✦DESIGN✦"
                    onHover="slowDown"
                    spinDuration={20}
                    className="!absolute !left-0 !top-20 sm:!left-0 sm:!top-28 lg:!left-6 lg:!top-24 !text-violet-primary !inset-0 custom-class w-96 2xl:w-[30rem]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div ref={titleRef} className="hidden 2xl:block">
              <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
                A propos
              </span>

              <h2 className="title-text text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-6">
                Transformer les idees en{" "}
                <span className="text-transparent bg-clip-text bg-gradient-violet title-label">
                  experiences digitales
                </span>
              </h2>
            </div>

            <p
              ref={descriptionRef}
              className="text-light-secondary text-lg leading-relaxed mb-8 hidden 2xl:block"
            >
              {aboutData.description}
            </p>

            {/* Bullet points */}
            <ul ref={pointsRef} className="space-y-4 mb-10">
              {aboutData.points.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-violet-accent mt-1 flex-shrink-0" />
                  <span className="text-light-secondary">{point}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
              style={{ perspective: "800px" }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card bg-dark-card p-3 sm:p-4 rounded-xl border border-dark-border text-center transition-colors duration-300 cursor-pointer hover:border-violet-primary/50"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <stat.icon className="w-6 h-6 text-violet-accent mx-auto mb-2" />
                  <p className="stat-value text-light-primary font-semibold text-sm">
                    {stat.value}
                  </p>
                  <p className="text-light-muted text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Values */}
            <div
              ref={valuesRef}
              className="mt-8 p-4 bg-dark-card/50 rounded-xl border border-dark-border"
            >
              <p className="text-light-muted text-sm">
                <span className="text-violet-accent font-semibold">
                  Mes valeurs :
                </span>{" "}
                {aboutData.values}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
