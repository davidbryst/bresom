import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import { CheckCircle, Clock, Layers, Heart } from "lucide-react";
import { aboutData } from "~/data/content";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const pointsRef = useRef<HTMLUListElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Clock, label: "Experience", value: aboutData.experience },
    { icon: Layers, label: "Stack", value: "Full Stack" },
    { icon: Heart, label: "Passion", value: "Design & Code" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animation de l'image avec parallax et rotation 3D
      if (imageRef.current) {
        // Decorative elements animation
        const decorElements = imageRef.current.querySelectorAll(".decor-element");
        gsap.fromTo(
          decorElements,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: easings.elastic,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        // Image reveal with clip-path
        gsap.fromTo(
          imageRef.current.querySelector(".image-wrapper"),
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.2,
            ease: easings.expoInOut,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );

        // Parallax effect on image
        gsap.to(imageRef.current.querySelector("img"), {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Title animation with text reveal
      if (titleRef.current) {
        const titleSpan = titleRef.current.querySelector(".title-label");
        const titleText = titleRef.current.querySelector(".title-text");

        gsap.fromTo(
          titleSpan,
          { width: 0, opacity: 0 },
          {
            width: "auto",
            opacity: 1,
            duration: 0.8,
            ease: easings.expo,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        if (titleText) {
          gsap.fromTo(
            titleText,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: easings.spring,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
              },
            }
          );
        }
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 30, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: easings.smooth,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }

      // Points animation with stagger
      if (pointsRef.current) {
        const points = pointsRef.current.querySelectorAll("li");
        gsap.fromTo(
          points,
          { opacity: 0, x: -30, filter: "blur(4px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.15,
            ease: easings.spring,
            scrollTrigger: {
              trigger: pointsRef.current,
              start: "top 75%",
            },
          }
        );

        // Icon animation
        points.forEach((point) => {
          const icon = point.querySelector("svg");
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
                },
              }
            );
          }
        });
      }

      // Stats cards animation
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll(".stat-card");
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: easings.spring,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );

        // Hover animation setup for stat cards
        statCards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
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

      // Values card animation
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: easings.spring,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-dark-surface relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="decor-element absolute -top-4 -left-4 w-24 h-24 border-2 border-violet-primary/30 rounded-2xl" />
              <div className="decor-element absolute -bottom-4 -right-4 w-32 h-32 bg-violet-primary/10 rounded-2xl blur-xl" />

              <div className="image-wrapper relative bg-dark-card p-2 rounded-2xl shadow-premium border border-dark-border overflow-hidden">
                <img
                  src="/profile/face-identiter.jpg"
                  alt="David Abraham - About"
                  className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div ref={titleRef}>
              <span className="title-label text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block overflow-hidden">
                A propos
              </span>

              <h2 className="title-text text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-6">
                Transformer les idees en{" "}
                <span className="text-transparent bg-clip-text bg-gradient-violet">
                  experiences digitales
                </span>
              </h2>
            </div>

            <p
              ref={descriptionRef}
              className="text-light-secondary text-lg leading-relaxed mb-8"
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
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card bg-dark-card p-4 rounded-xl border border-dark-border text-center transition-colors duration-300 cursor-pointer hover:border-violet-primary/50"
                >
                  <stat.icon className="w-6 h-6 text-violet-accent mx-auto mb-2" />
                  <p className="text-light-primary font-semibold text-sm">
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
