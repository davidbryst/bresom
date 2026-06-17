import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiencesData, type ExperienceItem } from "~/data/content";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { easings } from "~/hooks/useGSAP";
import CircularText from "./CircularText";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const badge = headerRef.current.querySelector(".header-badge");
        const title = headerRef.current.querySelector(".header-title");
        const desc = headerRef.current.querySelector(".header-desc");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          badge,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: easings.elastic },
        )
          .fromTo(
            title,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: easings.elastic },
            "-=0.3",
          )
          .fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: easings.elastic },
            "-=0.4",
          );
      }

      // Timeline line animation - draws from top to bottom on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1,
            },
          },
        );
      }

      // Experience cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const dot = card.querySelector(".timeline-dot");
        const content = card.querySelector(".exp-card");
        const responsibilities = card.querySelectorAll(".responsibility-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });

        // Dot animation
        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: easings.elastic,
          },
        );

        // Card slide in from left
        tl.fromTo(
          content,
          {
            opacity: 0,
            x: -60,
            rotateY: -5,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.2,
            ease: easings.elastic,
          },
          "-=0.3",
        );

        // Responsibilities stagger
        tl.fromTo(
          responsibilities,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: easings.elastic,
          },
          "-=0.3",
        );

        // Card hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(content, {
            y: -6,
            boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.2)",
            borderColor: "rgba(124, 58, 237, 0.3)",
            duration: 0.4,
            ease: easings.elastic,
          });

          gsap.to(dot, {
            scale: 1.2,
            boxShadow: "0 0 30px rgba(124, 58, 237, 0.6)",
            duration: 0.3,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(content, {
            y: 0,
            boxShadow: "none",
            borderColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.4,
            ease: easings.elastic,
          });

          gsap.to(dot, {
            scale: 1,
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
            duration: 0.3,
          });
        });
      });

      // Side image animation
      if (imageRef.current) {
        const imgContainer = imageRef.current.querySelector(".img-container");
        const badge = imageRef.current.querySelector(".img-badge");
        const decorBorder = imageRef.current.querySelector(".decor-border");
        const decorGlow = imageRef.current.querySelector(".decor-glow");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          decorBorder,
          { opacity: 0, scale: 0.8, rotate: -10 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: easings.elastic,
          },
        )
          .fromTo(
            decorGlow,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.8, ease: easings.elastic },
            "-=0.6",
          )
          .fromTo(
            imgContainer,
            { opacity: 0, x: 60, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: easings.elastic,
            },
            "-=0.5",
          )
          .fromTo(
            badge,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: easings.elastic },
            "-=0.3",
          );

        // Continuous floating animation for image
        gsap.to(imgContainer, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Parallax on scroll
        gsap.to(imageRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 sm:py-44 md:py-64 bg-dark-surface relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-deep to-transparent pointer-events-none" />

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#7C3AED_1px,transparent_1px),linear-gradient(180deg,#7C3AED_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase  mb-5 sm:mb-10 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
            Parcours
          </span>
          <h2 className="header-title text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Mon{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Expérience
            </span>
          </h2>
          <p className="header-desc text-light-secondary max-w-2xl mx-auto">
            Un parcours riche en collaborations et projets variés
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Timeline */}
          <div ref={timelineRef} className="lg:col-span-3 relative">
            {/* Vertical line */}
            <div
              ref={lineRef}
              className="absolute left-3 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-primary via-violet-accent to-dark-border origin-top"
            />

            <div className="space-y-8">
              {experiencesData.map((exp: ExperienceItem, index: number) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="relative pl-11 sm:pl-16 md:pl-20"
                  style={{ perspective: "1000px" }}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute left-[0.05rem] sm:left-3 md:left-5 top-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-violet rounded-full flex items-center justify-center shadow-glow-violet z-10">
                    <Briefcase className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                  </div>

                  {/* Content card */}
                  <div
                    className="exp-card bg-dark-card p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-dark-border transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Date badge */}
                    <div className="flex items-center gap-2 text-violet-accent text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{exp.date}</span>
                    </div>

                    {/* Company & Position */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-light-primary mb-1 transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className="text-sm sm:text-base text-light-secondary mb-3 sm:mb-4">
                      {exp.position}
                    </p>

                    {/* Responsibilities */}
                    <ul className="space-y-2">
                      {exp.responsibilities.map(
                        (resp: string, respIndex: number) => (
                          <li
                            key={respIndex}
                            className="responsibility-item flex items-start gap-2 text-sm text-light-muted"
                          >
                            <ChevronRight className="w-4 h-4 text-violet-accent mt-0.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Image */}
          <div
            ref={imageRef}
            className="lg:col-span-2 lg:block sticky top-32 mt-20 sm:mt-28 lg:mt-0 mx-4 sm:mx-12 md:mx-0"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="decor-border absolute -top-6 -right-6 w-32 h-32 border-4 border-violet-primary/70 rounded-2xl" />
              <div className="decor-glow absolute -bottom-6 -left-6 w-40 h-40 bg-violet-primary/10 rounded-2xl blur-2xl" />

              {/* Image card */}
              <div className="bg-dark-card p-3 rounded-3xl shadow-premium border border-dark-border">
                <div className="img-container relative rounded-2xl overflow-hidden">
                  {/* Violet overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-primary/20 to-transparent pointer-events-none z-10 rounded-3xl" />

                  {/* <img
                    src="/profile/s-prodile-contreplonger.png"
                    alt="David Abraham - Ambition"
                    className="absolute z-0 w-full aspect-[3/4] object-cover rounded-2xl"
                  /> */}
                  <img
                    src="/profile/prodile-contreplonger.webp"
                    alt="David Abraham - Ambition"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[3/4] object-cover rounded-2xl"
                  />
                  <CircularText
                    text="TAILWIND✦NEST✦MONGO✦FLUTTER✦BLENDER✦"
                    onHover="slowDown"
                    spinDuration={20}
                    className="!absolute !left-12 !top-6 sm:!left-12 sm:!top-16 md:!left-12 md:!top-20 lg:!left-12 lg:!top-8 2xl:!left-12 2xl:!top-12 !text-violet-primary !inset-0 custom-class w-72 md:w-[29rem] lg:w-80 2xl:w-[23rem]"
                  />
                  {/* Badge */}
                  <div className="img-badge absolute bottom-6 left-6 right-6 bg-dark-surface/90 backdrop-blur-sm p-4 rounded-xl border border-dark-border">
                    <p className="text-light-primary font-semibold text-sm">
                      Toujours en quête d'excellence
                    </p>
                    <p className="text-light-muted text-xs mt-1">
                      Passion, rigueur et innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
