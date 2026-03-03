import { useRef, useEffect, useCallback, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Advanced easings
export const advancedEasings = {
  smooth: "power2.out",
  smoothInOut: "power2.inOut",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  circ: "circ.out",
  spring: "power4.out",
  // Custom premium easing (GSAP compatible)
  premium: "power3.out",
  snappy: "power3.out",
  gentle: "sine.out",
};

// Text splitting animation - character level
export function useTextSplitChars<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const splitAndAnimate = useCallback(
    (options?: {
      delay?: number;
      stagger?: number;
      duration?: number;
      scrollTrigger?: boolean;
      start?: string;
    }) => {
      if (!ref.current || typeof window === "undefined") return;

      const element = ref.current;
      const text = element.textContent || "";
      const chars = text.split("");

      element.innerHTML = chars
        .map((char) =>
          char === " "
            ? " "
            : `<span class="inline-block gsap-char" style="transform-origin: center bottom;">${char}</span>`
        )
        .join("");

      const charElements = element.querySelectorAll(".gsap-char");

      const animationConfig: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: options?.duration || 0.6,
        stagger: options?.stagger || 0.02,
        ease: advancedEasings.spring,
        delay: options?.delay || 0,
      };

      if (options?.scrollTrigger !== false) {
        gsap.fromTo(
          charElements,
          {
            yPercent: 100,
            opacity: 0,
            rotateX: -90,
          },
          {
            ...animationConfig,
            scrollTrigger: {
              trigger: element,
              start: options?.start || "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          charElements,
          {
            yPercent: 100,
            opacity: 0,
            rotateX: -90,
          },
          animationConfig
        );
      }
    },
    []
  );

  return { ref, splitAndAnimate };
}

// Text splitting animation - word level
export function useTextSplitWords<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const splitAndAnimate = useCallback(
    (options?: {
      delay?: number;
      stagger?: number;
      duration?: number;
      scrollTrigger?: boolean;
      start?: string;
      direction?: "up" | "down" | "left" | "right";
    }) => {
      if (!ref.current || typeof window === "undefined") return;

      const element = ref.current;
      const text = element.textContent || "";
      const words = text.split(" ");

      element.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block gsap-word">${word}</span></span>`
        )
        .join(" ");

      const wordElements = element.querySelectorAll(".gsap-word");

      const directions = {
        up: { y: 100, x: 0 },
        down: { y: -100, x: 0 },
        left: { x: 100, y: 0 },
        right: { x: -100, y: 0 },
      };

      const dir = options?.direction || "up";
      const fromVars = {
        ...directions[dir],
        opacity: 0,
      };

      const animationConfig: gsap.TweenVars = {
        y: 0,
        x: 0,
        opacity: 1,
        duration: options?.duration || 0.8,
        stagger: options?.stagger || 0.05,
        ease: advancedEasings.spring,
        delay: options?.delay || 0,
      };

      if (options?.scrollTrigger !== false) {
        gsap.fromTo(wordElements, fromVars, {
          ...animationConfig,
          scrollTrigger: {
            trigger: element,
            start: options?.start || "top 85%",
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.fromTo(wordElements, fromVars, animationConfig);
      }
    },
    []
  );

  return { ref, splitAndAnimate };
}

// Text splitting animation - line level
export function useTextSplitLines<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const splitAndAnimate = useCallback(
    (options?: {
      delay?: number;
      stagger?: number;
      duration?: number;
      scrollTrigger?: boolean;
      start?: string;
    }) => {
      if (!ref.current || typeof window === "undefined") return;

      const element = ref.current;
      const lines = element.innerHTML.split("<br>");

      element.innerHTML = lines
        .map(
          (line) =>
            `<div class="overflow-hidden"><div class="gsap-line">${line}</div></div>`
        )
        .join("");

      const lineElements = element.querySelectorAll(".gsap-line");

      const animationConfig: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration: options?.duration || 1,
        stagger: options?.stagger || 0.15,
        ease: advancedEasings.spring,
        delay: options?.delay || 0,
      };

      if (options?.scrollTrigger !== false) {
        gsap.fromTo(
          lineElements,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            ...animationConfig,
            scrollTrigger: {
              trigger: element,
              start: options?.start || "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          lineElements,
          {
            yPercent: 100,
            opacity: 0,
          },
          animationConfig
        );
      }
    },
    []
  );

  return { ref, splitAndAnimate };
}

// SVG Path Drawing Animation
export function useSVGDraw<T extends SVGElement>() {
  const ref = useRef<T>(null);

  const animate = useCallback(
    (options?: {
      duration?: number;
      delay?: number;
      stagger?: number;
      scrollTrigger?: boolean;
      start?: string;
      ease?: string;
    }) => {
      if (!ref.current || typeof window === "undefined") return;

      const paths = ref.current.querySelectorAll("path, line, circle, rect, polyline, polygon");

      paths.forEach((path) => {
        const pathElement = path as SVGGeometryElement;
        if (pathElement.getTotalLength) {
          const length = pathElement.getTotalLength();
          gsap.set(pathElement, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        }
      });

      const animationConfig: gsap.TweenVars = {
        strokeDashoffset: 0,
        duration: options?.duration || 2,
        stagger: options?.stagger || 0.1,
        ease: options?.ease || advancedEasings.expo,
        delay: options?.delay || 0,
      };

      if (options?.scrollTrigger !== false) {
        gsap.to(paths, {
          ...animationConfig,
          scrollTrigger: {
            trigger: ref.current,
            start: options?.start || "top 80%",
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.to(paths, animationConfig);
      }
    },
    []
  );

  return { ref, animate };
}

// SVG Morph Animation (requires two paths)
export function useSVGMorph<T extends SVGPathElement>() {
  const ref = useRef<T>(null);

  const morphTo = useCallback(
    (targetPath: string, options?: { duration?: number; ease?: string }) => {
      if (!ref.current || typeof window === "undefined") return;

      gsap.to(ref.current, {
        attr: { d: targetPath },
        duration: options?.duration || 1,
        ease: options?.ease || advancedEasings.smoothInOut,
      });
    },
    []
  );

  return { ref, morphTo };
}

// Reveal animation with mask
export function useRevealMask<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const reveal = useCallback(
    (options?: {
      direction?: "left" | "right" | "top" | "bottom";
      duration?: number;
      delay?: number;
      scrollTrigger?: boolean;
      start?: string;
    }) => {
      if (!ref.current || typeof window === "undefined") return;

      const direction = options?.direction || "left";
      const clipPaths = {
        left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
        right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
        top: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
        bottom: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
      };

      const animationConfig: gsap.TweenVars = {
        clipPath: clipPaths[direction].to,
        duration: options?.duration || 1.2,
        ease: advancedEasings.expo,
        delay: options?.delay || 0,
      };

      gsap.set(ref.current, { clipPath: clipPaths[direction].from });

      if (options?.scrollTrigger !== false) {
        gsap.to(ref.current, {
          ...animationConfig,
          scrollTrigger: {
            trigger: ref.current,
            start: options?.start || "top 80%",
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.to(ref.current, animationConfig);
      }
    },
    []
  );

  return { ref, reveal };
}

// Parallax with scroll progress
export function useScrollParallax<T extends HTMLElement>(
  speed: number = 0.5,
  direction: "vertical" | "horizontal" = "vertical"
) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const property = direction === "vertical" ? "yPercent" : "xPercent";

    const animation = gsap.to(ref.current, {
      [property]: -100 * speed,
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
  }, [speed, direction]);

  return ref;
}

// Scale on scroll
export function useScrollScale<T extends HTMLElement>(
  fromScale: number = 0.8,
  toScale: number = 1
) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const animation = gsap.fromTo(
      ref.current,
      { scale: fromScale, opacity: 0 },
      {
        scale: toScale,
        opacity: 1,
        ease: advancedEasings.smooth,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    scrollTriggerRef.current = animation.scrollTrigger as ScrollTrigger;

    return () => {
      scrollTriggerRef.current?.kill();
      animation.kill();
    };
  }, [fromScale, toScale]);

  return ref;
}

// Rotate on scroll
export function useScrollRotate<T extends HTMLElement>(degrees: number = 360) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const animation = gsap.to(ref.current, {
      rotation: degrees,
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
  }, [degrees]);

  return ref;
}

// Stagger children animation
export function useStaggerChildren<T extends HTMLElement>(
  childSelector: string,
  options?: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number | gsap.StaggerVars;
    scrollTrigger?: boolean;
    start?: string;
  }
) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const children = ref.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const fromVars = options?.from || {
      opacity: 0,
      y: 60,
      scale: 0.95,
    };

    const toVars = options?.to || {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: advancedEasings.spring,
    };

    const stagger = options?.stagger || {
      each: 0.1,
      from: "start",
    };

    let animation: gsap.core.Tween;

    if (options?.scrollTrigger !== false) {
      animation = gsap.fromTo(children, fromVars, {
        ...toVars,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: options?.start || "top 80%",
          toggleActions: "play none none none",
        },
      });
      scrollTriggerRef.current = animation.scrollTrigger as ScrollTrigger;
    } else {
      animation = gsap.fromTo(children, fromVars, { ...toVars, stagger });
    }

    return () => {
      scrollTriggerRef.current?.kill();
      animation.kill();
    };
  }, [childSelector, options]);

  return ref;
}

// Magnetic hover effect
export function useMagneticHover<T extends HTMLElement>(strength: number = 0.3) {
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
        duration: 0.4,
        ease: advancedEasings.smooth,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: advancedEasings.elastic,
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

// Horizontal scroll section
export function useHorizontalScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current || typeof window === "undefined") return;

    const container = containerRef.current;
    const section = sectionRef.current;

    const totalWidth = container.scrollWidth - window.innerWidth;

    const animation = gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    scrollTriggerRef.current = animation.scrollTrigger as ScrollTrigger;

    return () => {
      scrollTriggerRef.current?.kill();
      animation.kill();
    };
  }, []);

  return { containerRef, sectionRef };
}

// Counter animation
export function useCounter<T extends HTMLElement>(
  endValue: number,
  options?: {
    duration?: number;
    scrollTrigger?: boolean;
    start?: string;
    prefix?: string;
    suffix?: string;
  }
) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const element = ref.current;
    const prefix = options?.prefix || "";
    const suffix = options?.suffix || "";

    const animationConfig = {
      value: endValue,
      duration: options?.duration || 2,
      ease: advancedEasings.expo,
      onUpdate: function (this: { targets: () => { value: number }[] }) {
        const value = Math.round(this.targets()[0].value);
        element.textContent = `${prefix}${value}${suffix}`;
      },
    };

    const counter = { value: 0 };

    if (options?.scrollTrigger !== false) {
      animationRef.current = gsap.to(counter, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start: options?.start || "top 80%",
          toggleActions: "play none none none",
        },
      });
      scrollTriggerRef.current = animationRef.current.scrollTrigger as ScrollTrigger;
    } else {
      animationRef.current = gsap.to(counter, animationConfig);
    }

    return () => {
      scrollTriggerRef.current?.kill();
      animationRef.current?.kill();
    };
  }, [endValue, options]);

  return ref;
}

// Floating animation (continuous)
export function useFloating<T extends HTMLElement>(
  options?: {
    yAmount?: number;
    xAmount?: number;
    rotateAmount?: number;
    duration?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const element = ref.current;
    const yAmount = options?.yAmount || 20;
    const xAmount = options?.xAmount || 0;
    const rotateAmount = options?.rotateAmount || 0;
    const duration = options?.duration || 3;

    gsap.to(element, {
      y: yAmount,
      x: xAmount,
      rotation: rotateAmount,
      duration: duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [options]);

  return ref;
}

// Progress bar animation
export function useProgressBar<T extends HTMLElement>(targetWidth: string | number) {
  const ref = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const element = ref.current;

    animationRef.current = gsap.fromTo(
      element,
      { width: 0 },
      {
        width: targetWidth,
        duration: 1.5,
        ease: advancedEasings.expo,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    scrollTriggerRef.current = animationRef.current.scrollTrigger as ScrollTrigger;

    return () => {
      scrollTriggerRef.current?.kill();
      animationRef.current?.kill();
    };
  }, [targetWidth]);

  return ref;
}

// Export GSAP for direct use
export { gsap, ScrollTrigger };
