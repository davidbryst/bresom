import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  animationType?: "slideUp" | "fadeIn" | "cascade" | "parallax" | "none";
  staggerChildren?: boolean;
  delay?: number;
}

/**
 * Composant wrapper pour ajouter des animations GSAP au scroll
 * Supporte plusieurs types d'animations
 */
export function AnimatedSection({
  children,
  id,
  className = "",
  animationType = "slideUp",
  staggerChildren = false,
  delay = 0,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || animationType === "none") return;

    const section = sectionRef.current;

    switch (animationType) {
      case "slideUp":
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
        break;

      case "fadeIn":
        gsap.fromTo(
          section,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
        break;

      case "cascade":
        if (staggerChildren) {
          const children = section.querySelectorAll("> *");
          gsap.fromTo(
            children,
            {
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.12,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );
        } else {
          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
        break;

      case "parallax":
        gsap.to(section, {
          y: (index, target) => {
            return (gsap.getProperty(target, "--parallax-speed") as number) || -50;
          },
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        break;
    }
  }, [animationType, staggerChildren, delay]);

  return (
    <div ref={sectionRef} id={id} className={className}>
      {children}
    </div>
  );
}

/**
 * Composant pour animer les éléments enfants au scroll
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  itemSelector?: string;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.12,
  itemSelector = "> *",
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(itemSelector);

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 30,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: staggerDelay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  }, [staggerDelay, itemSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
