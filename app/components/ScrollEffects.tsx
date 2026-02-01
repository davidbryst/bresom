import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  triggerElement?: React.RefObject<HTMLElement>;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * Composant pour les révélations au scroll avec directions variables
 */
export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  distance = 50,
  duration = 0.8,
  delay = 0,
  once = true,
  threshold = 0.75,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${100 - threshold * 100}%`,
          once,
        },
      },
    );
  }, [direction, distance, duration, delay, once, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 to 1
  offset?: number;
}

/**
 * Composant pour les effets parallax au scroll
 */
export function Parallax({
  children,
  className = "",
  speed = -0.5,
  offset = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed + offset,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        markers: false,
      },
    });
  }, [speed, offset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

/**
 * Composant pour animer le texte mot par mot
 */
export function SplitText({
  text,
  className = "",
  staggerDelay = 0.05,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = text.split(" ");
    ref.current.innerHTML = words
      .map((word) => `<span class="split-word">${word}</span>`)
      .join(" ");

    const wordSpans = ref.current.querySelectorAll(".split-word");

    gsap.fromTo(
      wordSpans,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: staggerDelay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, [text, staggerDelay]);

  return <div ref={ref} className={className} />;
}

interface NumberCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

/**
 * Composant pour animer des compteurs de nombres
 */
export function NumberCounter({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}: NumberCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || isAnimated) return;

    const obj = { value: from };

    gsap.to(obj, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.innerText = prefix + Math.round(obj.value) + suffix;
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
        onEnter: () => setIsAnimated(true),
      },
    });
  }, [from, to, duration, prefix, suffix, isAnimated]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {from}
      {suffix}
    </div>
  );
}

interface PinSectionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * Composant pour fixer une section au scroll (pin effect)
 */
export function PinSection({
  children,
  className = "",
  duration = 3,
}: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: `bottom top+=${duration * 100}`,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, [duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
