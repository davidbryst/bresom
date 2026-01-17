import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook pour créer une timeline d'animation au scroll
 */
export function useScrollTimeline(deps: any[] = []) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const createTimeline = useCallback((config: any = {}) => {
    timelineRef.current = gsap.timeline({
      ...config,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        ...config.scrollTrigger,
      },
    });
    return timelineRef.current;
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, deps);

  return { containerRef, timelineRef, createTimeline };
}

/**
 * Hook pour les animations de morphing
 */
export function useMorphAnimation(
  ref: React.RefObject<SVGPathElement>,
  pathVariants: string[],
  duration: number = 2
) {
  useEffect(() => {
    if (!ref.current) return;

    let currentIndex = 0;

    const animate = () => {
      const nextIndex = (currentIndex + 1) % pathVariants.length;

      gsap.to(ref.current, {
        attr: { d: pathVariants[nextIndex] },
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = nextIndex;
          animate();
        },
      });
    };

    animate();
  }, [pathVariants, duration]);
}

/**
 * Hook pour les animations de dégradé de couleur
 */
export function useGradientAnimation(
  ref: React.RefObject<HTMLElement>,
  colors: string[],
  duration: number = 4
) {
  useEffect(() => {
    if (!ref.current) return;

    const animateGradient = () => {
      let colorIndex = 0;

      setInterval(() => {
        const currentColor = colors[colorIndex];
        const nextColor = colors[(colorIndex + 1) % colors.length];

        gsap.to(ref.current, {
          background: `linear-gradient(90deg, ${currentColor}, ${nextColor})`,
          duration,
          ease: "none",
        });

        colorIndex = (colorIndex + 1) % colors.length;
      }, duration * 1000);
    };

    animateGradient();
  }, [colors, duration]);
}

/**
 * Hook pour les animations de position au scroll (scroll reveal)
 */
export function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  options: {
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    delay?: number;
    once?: boolean;
    start?: string;
  } = {}
) {
  const {
    direction = "up",
    distance = 50,
    duration = 0.8,
    delay = 0,
    once = true,
    start = "top 75%",
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const directions = {
      up: { x: 0, y: distance },
      down: { x: 0, y: -distance },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const directionValues = directions[direction];

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x: directionValues.x,
        y: directionValues.y,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
        },
      }
    );
  }, [ref, direction, distance, duration, delay, once, start]);
}

/**
 * Hook pour les animations d'interaction au hover
 */
export function useHoverAnimation(
  ref: React.RefObject<HTMLElement>,
  animationConfig: {
    scale?: number;
    y?: number;
    rotation?: number;
    duration?: number;
  } = {}
) {
  const {
    scale = 1.05,
    y = -10,
    rotation = 0,
    duration = 0.3,
  } = animationConfig;

  const handleHoverStart = () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scale,
      y,
      rotation,
      duration,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleHoverEnd = () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      rotation: 0,
      duration,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mouseenter", handleHoverStart);
    element.addEventListener("mouseleave", handleHoverEnd);

    return () => {
      element.removeEventListener("mouseenter", handleHoverStart);
      element.removeEventListener("mouseleave", handleHoverEnd);
    };
  }, [scale, y, rotation, duration]);
}

/**
 * Hook pour les animations de stagger
 */
export function useStaggerAnimation(
  ref: React.RefObject<HTMLElement>,
  options: {
    selector?: string;
    duration?: number;
    stagger?: number;
    start?: string;
    once?: boolean;
  } = {}
) {
  const {
    selector = "> *",
    duration = 0.6,
    stagger = 0.1,
    start = "top 75%",
    once = true,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
        },
      }
    );
  }, [ref, selector, duration, stagger, start, once]);
}

/**
 * Hook pour les animations de parallax
 */
export function useParallaxAnimation(
  ref: React.RefObject<HTMLElement>,
  speed: number = -0.5
) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
      },
    });
  }, [ref, speed]);
}

/**
 * Hook pour créer un clip-path animation
 */
export function useClipPathAnimation(
  ref: React.RefObject<HTMLElement>,
  paths: string[],
  duration: number = 1
) {
  useEffect(() => {
    if (!ref.current) return;

    let index = 0;

    const animate = () => {
      const nextIndex = (index + 1) % paths.length;

      gsap.to(ref.current, {
        clipPath: paths[nextIndex],
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          index = nextIndex;
          animate();
        },
      });
    };

    animate();
  }, [paths, duration]);
}

/**
 * Hook pour les animations de texte qui apparaît/disparaît
 */
export function useTypewriterAnimation(
  ref: React.RefObject<HTMLElement>,
  text: string,
  speed: number = 50
) {
  useEffect(() => {
    if (!ref.current) return;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const typeCharacter = () => {
      if (index < text.length) {
        ref.current!.textContent +=
          text.charAt(index);
        index++;
        timeoutId = setTimeout(
          typeCharacter,
          speed
        );
      }
    };

    ref.current.textContent = "";
    typeCharacter();

    return () => clearTimeout(timeoutId);
  }, [text, speed]);
}
