import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MouseFollowerProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Composant pour un curseur de souris qui suit le mouvement
 * Crée un effet visuel fluide au survol des éléments
 */
export function MouseFollower({
  className = "",
  color = "rgba(124, 58, 237, 0.8)",
  size = 20,
}: MouseFollowerProps) {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    const mousePos = { x: 0, y: 0 };
    const followerPos = { x: 0, y: 0 };

    // Track mouse position
    window.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    // Animate follower to follow mouse with ease
    const animate = () => {
      followerPos.x += (mousePos.x - followerPos.x) * 0.15;
      followerPos.y += (mousePos.y - followerPos.y) * 0.15;

      gsap.set(follower, {
        x: followerPos.x - size / 2,
        y: followerPos.y - size / 2,
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [size]);

  return (
    <div
      ref={followerRef}
      className={`fixed pointer-events-none z-50 rounded-full blur-sm ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  );
}

interface ScrollProgressBarProps {
  className?: string;
  color?: string;
  height?: number;
}

/**
 * Barre de progression du scroll
 */
export function ScrollProgressBar({
  className = "",
  color = "linear-gradient(90deg, #7C3AED, #EC4899)",
  height = 3,
}: ScrollProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: () => {
        const scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;
        return docHeight > 0 ? scrollTop / docHeight : 0;
      },
      ease: "none",
      scrollTrigger: {
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.getVelocity() > 0 ? self.progress : 0})`;
          }
        },
      },
    });

    // Simpler approach with scroll listener
    const handleScroll = () => {
      if (!progressRef.current) return;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
      const scrollPercent =
        docHeight > 0 ? scrollTop / docHeight : 0;
      progressRef.current.style.transform = `scaleX(${scrollPercent})`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className={`fixed top-0 left-0 origin-left ${className}`}
      style={{
        width: "100%",
        height,
        background: color,
        transform: "scaleX(0)",
        zIndex: 40,
      }}
    />
  );
}

interface ScrollingTextProps {
  text: string;
  duration?: number;
  className?: string;
}

/**
 * Texte qui défile horizontalement continuellement
 */
export function ScrollingText({
  text,
  duration = 20,
  className = "",
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const textWidth = textRef.current.offsetWidth;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    gsap.to(textRef.current, {
      x: -textWidth,
      duration,
      ease: "none",
      repeat: -1,
      repeatDelay: 0,
    });
  }, [duration]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div
        ref={textRef}
        className="inline-block"
      >
        {text} • {text} • {text} •{" "}
      </div>
    </div>
  );
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

/**
 * Éléments qui flottent aléatoirement à l'écran
 */
export function FloatingElements({
  count = 5,
  className = "",
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      ".floating-element"
    );

    elements.forEach((element, index) => {
      const randomX = Math.random() * 100 - 50;
      const randomY = Math.random() * 100 - 50;
      const randomDuration = 5 + Math.random() * 5;
      const randomDelay = index * 0.3;

      gsap.to(element, {
        x: randomX,
        y: randomY,
        rotation: Math.random() * 360,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: randomDelay,
      });
    });
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`relative pointer-events-none ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="floating-element absolute w-2 h-2 bg-violet-500 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

interface TextGlitchProps {
  text: string;
  className?: string;
}

/**
 * Effet de glitch sur le texte
 */
export function TextGlitch({
  text,
  className = "",
}: TextGlitchProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const glitchAnimation = () => {
      gsap.timeline()
        .to(ref.current, { x: 2, duration: 0.1 }, 0)
        .to(ref.current, { x: -2, duration: 0.1 }, 0.1)
        .to(ref.current, { x: 0, duration: 0.1 }, 0.2);
    };

    const interval = setInterval(glitchAnimation, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        textShadow: "2px 0 #00ff88, -2px 0 #ff0088",
      }}
    >
      {text}
    </div>
  );
}
