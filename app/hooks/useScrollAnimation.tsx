import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  markers?: boolean;
  animation?: (target: HTMLElement) => gsap.core.Timeline | void;
}

export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {},
) {
  const {
    trigger,
    start = "top 80%",
    end = "bottom 20%",
    markers = false,
    animation,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      if (animation) {
        animation(element);
      } else {
        // Animation par défaut: fade in et slideUp
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trigger || element,
              start,
              end,
              markers,
              once: true,
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [ref, trigger, start, end, markers, animation]);
}

export function useParallaxScroll(
  ref: React.RefObject<HTMLElement>,
  speed: number = -0.5,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          markers: false,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, speed]);
}

export function useFadeInOnScroll(
  ref: React.RefObject<HTMLElement>,
  duration: number = 0.8,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [ref, duration]);
}

export function useStaggerAnimation(
  ref: React.RefObject<HTMLElement>,
  selector: string = "> *",
  stagger: number = 0.1,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.querySelectorAll(selector),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, element);

    return () => ctx.revert();
  }, [ref, selector, stagger]);
}
