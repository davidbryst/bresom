import { useRef, useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Enregistrer les plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Configuration par défaut des easings premium
export const easings = {
  smooth: "power2.out",
  smoothInOut: "power2.inOut",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  circ: "circ.out",
  spring: "power4.out",
};

// Hook pour les animations au scroll
export function useScrollAnimation<T extends HTMLElement>(
  options: {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        scrub: options.scrub || false,
        markers: options.markers || false,
        toggleActions: options.toggleActions || "play none none reverse",
      },
    });

    return () => {
      tl.current?.kill();
    };
  }, [options]);

  return { ref, tl };
}

// Hook pour l'animation de texte split
export function useSplitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const splitAndAnimate = (delay = 0) => {
    if (!ref.current || typeof window === "undefined") return;

    const text = ref.current.textContent || "";
    const words = text.split(" ");

    ref.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block gsap-word">${word}</span></span>`
      )
      .join(" ");

    gsap.fromTo(
      ref.current.querySelectorAll(".gsap-word"),
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: easings.spring,
        delay,
      }
    );
  };

  return { ref, splitAndAnimate };
}

// Hook pour les animations de parallax
export function useParallax<T extends HTMLElement>(speed = 0.5) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const animation = gsap.to(ref.current, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    scrollTriggerRef.current = animation.scrollTrigger as ScrollTrigger;

    return () => {
      scrollTriggerRef.current?.kill();
      animation.kill();
    };
  }, [speed]);

  return ref;
}

// Hook pour le magnetic effect sur les boutons
export function useMagnetic<T extends HTMLElement>(strength = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: easings.smooth,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: easings.elastic,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

// Hook pour les animations staggerées
export function useStaggerAnimation<T extends HTMLElement>(
  selector: string,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number | gsap.StaggerVars;
    scrollTrigger?: boolean;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const fromVars = options.from || { opacity: 0, y: 50 };
    const toVars = options.to || {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: options.stagger || 0.1,
      ease: easings.spring,
    };

    if (options.scrollTrigger !== false) {
      animationRef.current = gsap.fromTo(elements, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      scrollTriggerRef.current = animationRef.current.scrollTrigger as ScrollTrigger;
    } else {
      animationRef.current = gsap.fromTo(elements, fromVars, toVars);
    }

    return () => {
      scrollTriggerRef.current?.kill();
      animationRef.current?.kill();
    };
  }, [selector, options]);

  return ref;
}

// Hook pour cursor follower
export function useCursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const cursor = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: easings.smooth,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return ref;
}

// Utilitaire pour créer une animation de reveal
export function createRevealAnimation(
  element: gsap.TweenTarget,
  direction: "up" | "down" | "left" | "right" = "up",
  delay = 0
) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      ...directions[direction],
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      delay,
      ease: easings.spring,
    }
  );
}

// Utilitaire pour créer une animation de scale
export function createScaleAnimation(
  element: gsap.TweenTarget,
  fromScale = 0.8,
  delay = 0
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: fromScale,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: easings.bounce,
    }
  );
}

// Export du gsap pour utilisation directe
export { gsap, ScrollTrigger, ScrollToPlugin };
