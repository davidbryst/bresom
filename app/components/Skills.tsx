import { useRef, useEffect, useState, useMemo } from "react";
import { gsap, ScrollTrigger, easings } from "~/hooks/useGSAP";
import FallingText from "./FallingText";
import CardSwap, { Card } from "./CardSwap";
import {
  skillsData,
  type DomainGroup,
  type SkillItem,
  type SkillBucket,
} from "~/data/content";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNodeJs,
  faLaravel,
  faGitAlt,
  faFigma,
  faAws,
  faAngular,
  faDocker,
  faAndroid,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faImage,
  faPenNib,
  faPalette,
  faMobileScreen,
  faLayerGroup,
  faCubes,
  faPencilRuler,
  faObjectGroup,
  faFont,
  faDroplet,
  faUniversalAccess,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiExpo,
  SiFlutter,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiBlender,
  SiRemix,
  SiRedis,
  SiGraphql,
  SiCloudflare,
  SiSpringboot,
  SiAdobeaftereffects,
} from "react-icons/si";

// Mapping des technologies aux icônes
const getTechIcon = (techName: string) => {
  const name = techName.toLowerCase();

  if (name === "react") return <FontAwesomeIcon icon={faReact} />;
  if (name === "next.js") return <SiNextdotjs />;
  if (name === "remix") return <SiRemix />;
  if (name === "angular") return <FontAwesomeIcon icon={faAngular} />;
  if (name === "typescript") return <SiTypescript />;
  if (name === "tailwind css") return <SiTailwindcss />;
  if (name === "node.js") return <FontAwesomeIcon icon={faNodeJs} />;
  if (name === "laravel") return <FontAwesomeIcon icon={faLaravel} />;
  if (name === "spring boot") return <SiSpringboot />;
  if (name === "graphql") return <SiGraphql />;
  if (name === "postgresql") return <SiPostgresql />;
  if (name === "mongodb") return <SiMongodb />;
  if (name === "redis") return <SiRedis />;
  if (name === "git") return <FontAwesomeIcon icon={faGitAlt} />;
  if (name === "docker") return <FontAwesomeIcon icon={faDocker} />;
  if (name === "figma") return <FontAwesomeIcon icon={faFigma} />;
  if (name === "photoshop") return <FontAwesomeIcon icon={faImage} />;
  if (name === "illustrator") return <FontAwesomeIcon icon={faPenNib} />;
  if (name === "blender") return <SiBlender />;
  if (name === "after effects") return <SiAdobeaftereffects />;
  if (name === "ui/ux design") return <FontAwesomeIcon icon={faPalette} />;
  if (name === "responsive design")
    return <FontAwesomeIcon icon={faMobileScreen} />;
  if (name === "design system") return <FontAwesomeIcon icon={faLayerGroup} />;
  if (name === "atomic design") return <FontAwesomeIcon icon={faCubes} />;
  if (name === "wireframing") return <FontAwesomeIcon icon={faPencilRuler} />;
  if (name === "prototyping") return <FontAwesomeIcon icon={faObjectGroup} />;
  if (name === "typography") return <FontAwesomeIcon icon={faFont} />;
  if (name === "color theory") return <FontAwesomeIcon icon={faDroplet} />;
  if (name === "accessibilité")
    return <FontAwesomeIcon icon={faUniversalAccess} />;
  if (name === "mobile-first") return <FontAwesomeIcon icon={faMobileAlt} />;
  if (name === "react native") return <FontAwesomeIcon icon={faReact} />;
  if (name === "expo") return <SiExpo />;
  if (name === "flutter") return <SiFlutter />;
  if (name === "android studio") return <FontAwesomeIcon icon={faAndroid} />;
  if (name === "xcode") return <FontAwesomeIcon icon={faApple} />;
  if (name === "supabase") return <SiSupabase />;
  if (name === "firebase") return <SiFirebase />;
  if (name === "aws") return <FontAwesomeIcon icon={faAws} />;
  if (name === "vercel") return <SiVercel />;
  if (name === "cloudflare") return <SiCloudflare />;

  return <FontAwesomeIcon icon={faCode} />;
};

interface FlatBucket {
  category: string;
  categoryIcon: any;
  categoryDescription: string;
  bucket: SkillBucket;
  globalIndex: number;
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const fallingTextRef = useRef<HTMLDivElement>(null);
  const infoBulleRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [cardConfig, setCardConfig] = useState({
    width: 650,
    height: 450,
    cardDistance: 50,
    verticalDistance: 40,
    skewAmount: 8,
  });

  // Responsive card dimensions + CardSwap parameters
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 380) {
        // Very small phones (iPhone SE, Galaxy S mini)
        setCardConfig({
          width: 290,
          height: 340,
          cardDistance: 15,
          verticalDistance: 12,
          skewAmount: 3,
        });
      } else if (w < 480) {
        // Small phones (iPhone 12 mini, standard Android)
        setCardConfig({
          width: 340,
          height: 380,
          cardDistance: 20,
          verticalDistance: 16,
          skewAmount: 4,
        });
      } else if (w < 640) {
        // Large phones (iPhone Pro Max, Galaxy S Ultra)
        setCardConfig({
          width: 400,
          height: 420,
          cardDistance: 25,
          verticalDistance: 20,
          skewAmount: 5,
        });
      } else if (w < 768) {
        // Small tablets / large phones landscape
        setCardConfig({
          width: 480,
          height: 440,
          cardDistance: 30,
          verticalDistance: 25,
          skewAmount: 5,
        });
      } else if (w < 1024) {
        // Tablets (iPad, Galaxy Tab)
        setCardConfig({
          width: 480,
          height: 460,
          cardDistance: 38,
          verticalDistance: 30,
          skewAmount: 6,
        });
      } else if (w < 1280) {
        // Small desktops / laptops
        setCardConfig({
          width: 400,
          height: 470,
          cardDistance: 32,
          verticalDistance: 34,
          skewAmount: 7,
        });
      } else if (w < 1440) {
        // Standard desktops
        setCardConfig({
          width: 530,
          height: 480,
          cardDistance: 42,
          verticalDistance: 36,
          skewAmount: 8,
        });
      } else if (w < 1920) {
        // Large desktops / QHD
        setCardConfig({
          width: 620,
          height: 530,
          cardDistance: 50,
          verticalDistance: 40,
          skewAmount: 8,
        });
      } else {
        // Ultra-wide / 4K
        setCardConfig({
          width: 720,
          height: 580,
          cardDistance: 55,
          verticalDistance: 44,
          skewAmount: 9,
        });
      }
    };

    updateDimensions();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 150);
    };
    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const allBuckets = useMemo(() => {
    const buckets: FlatBucket[] = [];
    let globalIndex = 0;
    skillsData.forEach((category: DomainGroup) => {
      category.buckets.forEach((bucket: SkillBucket) => {
        buckets.push({
          category: category.category,
          categoryIcon: category.icon,
          categoryDescription: category.description,
          bucket,
          globalIndex: globalIndex++,
        });
      });
    });
    return buckets;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animations
      if (headerRef.current) {
        const badge = headerRef.current.querySelector(".header-badge");
        const titleText = headerRef.current.querySelector(".title-text");
        const btn = headerRef.current.querySelector(".title-btn");

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, y: 30, rotateX: -90 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: headerRef.current,
                toggleActions: "play none none reverse",
                start: "top 80%",
              },
            },
          );
        }

        if (titleText) {
          gsap.fromTo(
            titleText,
            { opacity: 0, y: 60, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (btn) {
          gsap.fromTo(
            btn,
            { opacity: 0, y: 30, rotateX: -90 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: headerRef.current,
                toggleActions: "play none none reverse",
                start: "top 80%",
              },
            },
          );
        }
      }

      // Description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // FallingText disappear
      if (fallingTextRef.current) {
        gsap.fromTo(
          fallingTextRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (infoBulleRef.current) {
        const infoCards = infoBulleRef.current.querySelectorAll(".ele");
        infoCards.forEach((card, index) => {
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
                start: "top 100%",
                end: "top 90%",
                scrub: 0 + index * 0.3, // Staggered scrub speeds
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
                start: "top 80%",
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
      }

      if (cardSwapRef.current) {
        const swapCards = cardSwapRef.current.querySelectorAll(".buckets");
        swapCards.forEach((card, index) => {
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
                start: "top 95%",
                end: "top 90%",
                scrub: 0.5 + index * 0.5, // Staggered scrub speeds
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
                start: "top 80%",
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-dark-deep py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none"
        style={{ backgroundImage: "url('/profile/face-plonger.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-surface via-dark-deep to-dark-surface pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {/* <div ref={headerRef} className="text-center hidden mb-1">
          <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
            Competences
          </span>
          <h2 className="title-text text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Technologies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Outils
            </span>
          </h2>
          <p
            ref={descriptionRef}
            className="text-light-secondary max-w-2xl mx-auto mb-8"
          >
            Un ensemble de compétences techniques variées pour répondre à tous
            vos besoins
          </p>
          <a
            href="/cv.pdf"
            download
            className="title-btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet hover:scale-110 hover:shadow-2xl hover:shadow-violet-primary/40 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Télécharger mon CV
          </a>
        </div> */}

        {/* Main Content - Left Info + Right CardSwap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-center">
          {/* Left Side - Current Category Info */}
          <div className="space-y-1 order-1 lg:order-1">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-1">
              <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
                Competences
              </span>
              <h2 className="title-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-3 sm:mb-4">
                Technologies &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-violet">
                  Outils
                </span>
              </h2>
              <p
                ref={descriptionRef}
                className="text-sm sm:text-base text-light-secondary max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
              >
                Un ensemble de compétences techniques variées pour répondre à
                tous vos besoins
              </p>
              <a
                href="/cv.pdf"
                download
                className="title-btn inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-violet text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-glow-violet hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-violet-primary/40 transition-all duration-300"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="inline">Télécharger mon CV</span>
                {/* <span className="xs:hidden">Mon CV</span> */}
              </a>
            </div>
            {/* Category Pills with Navigation */}
            {/* FallingText Section */}
            <div
              ref={fallingTextRef}
              className="mb-8 sm:mb-12 md:mb-16 h-80 sm:h-64 md:h-52 lg:h-[17rem] xl:h-52 backdrop-blur-sm overflow-hidden pointer-events-auto"
            >
              <FallingText
                text="Je maîtrise le développement web frontend avec React, Next.js, Remix et Angular, accompagnés de TypeScript et Tailwind CSS. Côté backend, je travaille avec Node.js, Laravel et Spring Boot, connectés à des bases de données PostgreSQL et MongoDB. Pour le design, j'utilise Figma, Photoshop, Illustrator et Blender, en appliquant les principes d'UI/UX Design, Responsive Design et Design System. En mobile, je développe avec React Native et Expo. Je déploie mes projets sur Vercel, AWS, Firebase et Supabase."
                highlightWords={[
                  "React",
                  "Next.js",
                  "Remix",
                  "Angular",
                  "TypeScript",
                  "Tailwind",
                  "Node.js",
                  "Laravel",
                  "Spring",
                  "PostgreSQL",
                  "MongoDB",
                  "Figma",
                  "Photoshop",
                  "Illustrator",
                  "Blender",
                  "UI/UX",
                  "Responsive",
                  "Design System",
                  "React Native",
                  "Expo",
                  "Vercel",
                  "AWS",
                  "Firebase",
                  "Supabase",
                ]}
                highlightClass="text-violet-accent font-black"
                trigger="hover"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.7}
                fontSize="0.875rem"
                mouseConstraintStiffness={2}
              />
            </div>
            {/* Stats */}
            <div
              ref={infoBulleRef}
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-4"
            >
              <div className="ele text-center p-2 sm:p-4 bg-dark-card/40 rounded-lg sm:rounded-xl border border-dark-border/30">
                <p className="text-xl sm:text-3xl font-bold text-violet-accent">
                  {allBuckets.reduce(
                    (acc, b) => acc + b.bucket.items.length,
                    0,
                  )}
                  +
                </p>
                <p className="text-xs sm:text-sm text-light-muted">
                  Technologies
                </p>
              </div>
              <div className="ele text-center p-2 sm:p-4 bg-dark-card/40 rounded-lg sm:rounded-xl border border-dark-border/30">
                <p className="text-xl sm:text-3xl font-bold text-violet-accent">
                  3+
                </p>
                <p className="text-xs sm:text-sm text-light-muted">
                  Années d'exp.
                </p>
              </div>
              <div className="ele text-center p-2 sm:p-4 bg-dark-card/40 rounded-lg sm:rounded-xl border border-dark-border/30">
                <p className="text-xl sm:text-3xl font-bold text-violet-accent">
                  {skillsData.length}
                </p>
                <p className="text-xs sm:text-sm text-light-muted">Domaines</p>
              </div>
            </div>
          </div>

          {/* Right Side - CardSwap */}
          <div
            // ref={cardSwapRef}
            className="relative min-h-[340px] h-[45dvh] sm:min-h-[400px] sm:h-[55dvh] md:min-h-[440px] md:h-[60dvh] lg:min-h-[500px] lg:h-[65dvh] xl:min-h-[540px] xl:h-[68dvh] w-4/5 sm:w-3/4 lg:w-5/6 xl:w-6/6 lg:ml-8 xs:mt-16 sm:mt-28 order-2 lg:order-2 flex items-center justify-center md:justify-end"
          >
            <CardSwap
              cardDistance={cardConfig.cardDistance}
              verticalDistance={cardConfig.verticalDistance}
              delay={3000}
              pauseOnHover={false}
              width={cardConfig.width}
              height={cardConfig.height}
              skewAmount={cardConfig.skewAmount}
              easing="elastic"
              onCardClick={(idx) => setActiveCard(idx)}
            >
              {allBuckets.map((flatBucket, index) => {
                const Icon = flatBucket.categoryIcon;
                return (
                  <Card
                    key={index}
                    customClass="buckets !bg-dark-card/95 !border-violet-primary/30 backdrop-blur-xl p-3 sm:p-6 md:p-8 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 pb-3 sm:pb-5 border-b border-dark-border/30">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-violet flex items-center justify-center shadow-glow-violet flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] sm:text-xs text-violet-accent uppercase tracking-wider sm:tracking-widest font-medium">
                          {flatBucket.category}
                        </p>
                        <h4 className="text-base sm:text-xl md:text-2xl font-bold text-light-primary truncate">
                          {flatBucket.bucket.title}
                        </h4>
                      </div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-violet-accent/40 flex-shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 overflow-y-auto max-h-[250px] sm:max-h-[400px] pr-2 custom-scrollbar">
                      {flatBucket.bucket.items.map(
                        (skill: SkillItem, skillIndex: number) => (
                          <div
                            key={skillIndex}
                            className="flex flex-col items-center p-2 sm:p-4 bg-dark-deep/50 rounded-lg sm:rounded-xl border border-dark-border/30 hover:border-violet-primary/50 hover:bg-dark-deep/80 transition-all duration-300 group cursor-pointer"
                          >
                            <span className="text-2xl sm:text-3xl text-violet-accent/80 group-hover:text-violet-accent group-hover:scale-125 transition-all duration-300 mb-1 sm:mb-3">
                              {getTechIcon(skill.name)}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-light-primary text-center leading-tight">
                              {skill.name}
                            </span>
                          </div>
                        ),
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-5 border-t border-dark-border/30 flex items-center justify-between">
                      <span className="text-xs sm:text-sm md:text-base text-light-muted font-medium">
                        {flatBucket.bucket.items.length} compétences
                      </span>
                      <div className="flex gap-1 sm:gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                              i < Math.ceil(flatBucket.bucket.items.length / 2)
                                ? "bg-violet-accent"
                                : "bg-dark-border"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(124, 58, 237, 0.5);
        }
      `}</style>
    </section>
  );
}
