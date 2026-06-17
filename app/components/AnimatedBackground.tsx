import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

import Silk from "../../src/component/Silk";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
interface GlowOrbProps {
  color?: string;
  size?: number;
  position?: { x: string; y: string };
  delay?: number;
  duration?: number;
}

// Single animated glow orb
function GlowOrb({
  color = "rgba(124, 58, 237, 0.3)",
  size = 400,
  position = { x: "50%", y: "50%" },
  delay = 0,
  duration = 8,
}: GlowOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current) return;

    // Floating animation
    gsap.to(orbRef.current, {
      x: "random(-100, 100)",
      y: "random(-100, 100)",
      scale: "random(0.8, 1.2)",
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay,
    });

    // Pulsing glow
    gsap.to(orbRef.current, {
      opacity: "random(0.3, 0.7)",
      duration: duration / 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + 1,
    });

    return () => {
      gsap.killTweensOf(orbRef.current);
    };
  }, [delay, duration]);

  return (
    <div
      ref={orbRef}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}

// Aurora effect background
export function AuroraBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aurora1Ref = useRef<HTMLDivElement>(null);
  const aurora2Ref = useRef<HTMLDivElement>(null);
  const aurora3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Aurora 1 - Main purple wave
      if (aurora1Ref.current) {
        gsap.to(aurora1Ref.current, {
          x: 200,
          y: -100,
          rotation: 15,
          scale: 1.2,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(aurora1Ref.current, {
          opacity: 0.4,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Aurora 2 - Secondary wave
      if (aurora2Ref.current) {
        gsap.to(aurora2Ref.current, {
          x: -150,
          y: 80,
          rotation: -10,
          scale: 0.9,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });

        gsap.to(aurora2Ref.current, {
          opacity: 0.5,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // Aurora 3 - Accent wave
      if (aurora3Ref.current) {
        gsap.to(aurora3Ref.current, {
          x: 100,
          y: 50,
          rotation: 20,
          scale: 1.1,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 4,
        });

        gsap.to(aurora3Ref.current, {
          opacity: 0.3,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Aurora Wave 1 */}
      <div
        ref={aurora1Ref}
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[100%] opacity-30"
        style={{
          background:
            "linear-gradient(45deg, transparent 0%, rgba(124, 58, 237, 0.4) 30%, rgba(109, 40, 217, 0.3) 50%, transparent 70%)",
          filter: "blur(100px)",
          transform: "rotate(-12deg)",
        }}
      />

      {/* Aurora Wave 2 */}
      <div
        ref={aurora2Ref}
        className="absolute -bottom-1/4 -right-1/4 w-[120%] h-[80%] opacity-25"
        style={{
          background:
            "linear-gradient(-45deg, transparent 0%, rgba(139, 92, 246, 0.3) 40%, rgba(124, 58, 237, 0.2) 60%, transparent 80%)",
          filter: "blur(80px)",
          transform: "rotate(15deg)",
        }}
      />

      {/* Aurora Wave 3 - Accent */}
      <div
        ref={aurora3Ref}
        className="absolute top-1/3 left-1/3 w-[80%] h-[60%] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.4) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

// Floating particles with glow
export function GlowingParticles({
  count = 20,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.querySelectorAll(".glow-particle");

    particles.forEach((particle, i) => {
      // Random starting position
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
      });

      // Floating animation
      gsap.to(particle, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        duration: Math.random() * 5 + 5,
        repeat: -1,
        delay: i * 0.3,
        ease: "none",
        onRepeat: () => {
          gsap.set(particle, {
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
            opacity: Math.random() * 0.5 + 0.3,
          });
        },
      });

      // Pulsing glow via opacity (transform/opacity are GPU-composited;
      // animating box-shadow forces a full repaint each frame — avoided here).
      gsap.to(particle, {
        opacity: Math.random() * 0.4 + 0.4,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    });

    return () => {
      gsap.killTweensOf(particles);
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glow-particle absolute w-2 h-2 bg-violet-accent rounded-full opacity-50"
          style={{
            boxShadow: "0 0 10px rgba(124, 58, 237, 0.6)",
          }}
        />
      ))}
    </div>
  );
}

// Animated gradient mesh background
export function GradientMesh({ className = "" }: { className?: string }) {
  const meshRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const ctx = gsap.context(() => {
      // Blob 1 - Top left
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: 150,
          y: 100,
          scale: 1.3,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Blob 2 - Top right
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: -100,
          y: 150,
          scale: 0.8,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }

      // Blob 3 - Bottom left
      if (blob3Ref.current) {
        gsap.to(blob3Ref.current, {
          x: 80,
          y: -120,
          scale: 1.1,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 4,
        });
      }

      // Blob 4 - Center
      if (blob4Ref.current) {
        gsap.to(blob4Ref.current, {
          x: -50,
          y: 80,
          scale: 1.2,
          rotation: 180,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }
    }, meshRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={meshRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Blob 1 */}
      <div
        ref={blob1Ref}
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob 2 */}
      <div
        ref={blob2Ref}
        className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      {/* Blob 3 */}
      <div
        ref={blob3Ref}
        className="absolute -bottom-1/4 -left-1/4 w-[550px] h-[550px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      {/* Blob 4 - Center accent */}
      <div
        ref={blob4Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.25) 0%, rgba(109, 40, 217, 0.1) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}

// Spotlight effect that follows a pattern
export function SpotlightEffect({ className = "" }: { className?: string }) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spotlightRef.current) return;

    // Create a path animation for the spotlight
    gsap.to(spotlightRef.current, {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 200, y: -100 },
          { x: 400, y: 50 },
          { x: 200, y: 150 },
          { x: 0, y: 0 },
        ],
        curviness: 1.5,
      },
      duration: 20,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Pulsing intensity
    gsap.to(spotlightRef.current, {
      opacity: 0.4,
      scale: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(spotlightRef.current);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        ref={spotlightRef}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124, 58, 237, 0.5) 0%, rgba(124, 58, 237, 0.2) 30%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

// Main animated background component combining effects
interface AnimatedBackgroundProps {
  variant?: "aurora" | "mesh" | "particles" | "spotlight" | "combined";
  className?: string;
  intensity?: "low" | "medium" | "high";
  /** When false (e.g. section scrolled offscreen) the WebGL shader stops rendering. */
  isVisible?: boolean;
}

export default function AnimatedBackground({
  variant = "combined",
  className = "",
  intensity = "medium",
  isVisible = true,
}: AnimatedBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Freeze every looping GSAP tween inside the background (mesh blobs, aurora
  // waves, particles) when the section is offscreen — otherwise they keep
  // running and the large blurs are costly to composite every frame.
  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;
    const targets = gsap.utils.toArray<HTMLElement>(
      rootRef.current.querySelectorAll("*"),
    );
    if (targets.length === 0) return;
    gsap
      .getTweensOf(targets)
      .forEach((t) => (isVisible ? t.resume() : t.pause()));
  }, [isVisible, isDesktop, prefersReducedMotion]);

  const intensityOpacity = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70",
  };

  // The fabric (Silk) is always rendered — never removed. We only make it
  // cheaper: lower dpr on mobile, frozen frame for reduced-motion, paused when
  // the section is scrolled offscreen.
  const silkDpr: [number, number] = isDesktop ? [1, 1.5] : [1, 1];

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${intensityOpacity[intensity]} ${className}`}
    >
      {variant === "aurora" && <AuroraBackground />}
      {variant === "mesh" && <GradientMesh />}
      {variant === "particles" && <GlowingParticles count={15} />}
      {variant === "spotlight" && <SpotlightEffect />}
      {variant === "combined" &&
        (prefersReducedMotion ? (
          // Reduced motion: keep the fabric but frozen (one static frame) over a
          // static gradient — no looping animations.
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(124, 58, 237, 0.18) 0%, transparent 60%)",
              }}
            />
            <Silk
              speed={5}
              scale={1}
              color="#7C3AEDC1"
              noiseIntensity={1.5}
              rotation={0}
              animate={false}
              dpr={[1, 1]}
            />
          </>
        ) : (
          <>
            <GradientMesh />
            <AuroraBackground className="opacity-50" />
            <GlowingParticles count={isDesktop ? 10 : 6} />
            <Silk
              speed={5}
              scale={1}
              color="#7C3AEDC1"
              noiseIntensity={1.5}
              rotation={0}
              paused={!isVisible}
              dpr={silkDpr}
            />
          </>
        ))}
    </div>
  );
}
