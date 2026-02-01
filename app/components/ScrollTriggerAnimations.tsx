import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger Animations - Collection d'exemples pratiques
 * Animations déclenchées au scroll avec des effets impressionnants
 */

// ==========================================
// 1. REVEAL ANIMATION
// ==========================================
export function RevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 100,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 0.5,
          markers: false,
        },
      },
    );
  }, []);

  return (
    <div
      ref={ref}
      className="p-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-600/30"
    >
      <h2 className="text-3xl font-bold mb-4">Reveal Animation</h2>
      <p className="text-gray-400">
        Cet élément se révèle progressivement au scroll avec un effet de blur
      </p>
    </div>
  );
}

// ==========================================
// 2. PARALLAX SCROLL
// ==========================================
export function ParallaxScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      y: () => -200,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });
  }, []);

  return (
    <div ref={ref} className="relative h-96 overflow-hidden rounded-xl">
      <div
        ref={imageRef}
        className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-pink-600/30 flex items-center justify-center"
      >
        <h2 className="text-4xl font-bold text-white">Parallax Effect</h2>
      </div>
    </div>
  );
}

// ==========================================
// 3. STAGGER ANIMATION
// ==========================================
export function StaggerAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".stagger-item");

    gsap.fromTo(
      items,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <div ref={containerRef} className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Stagger Animation</h2>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="stagger-item p-6 bg-dark-surface border border-purple-600/30 rounded-lg"
        >
          <h3 className="font-semibold">Item {i + 1}</h3>
          <p className="text-gray-400 text-sm">
            Cet élément apparaît avec un délai par rapport aux autres
          </p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 4. COUNTER ANIMATION
// ==========================================
export function CounterAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const counters = ref.current.querySelectorAll(".counter");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = Math.round(obj.value).toString();
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-4 gap-6">
      {[
        { label: "Projects", value: 150 },
        { label: "Clients", value: 500 },
        { label: "Satisfaction", value: 99 },
        { label: "Years", value: 5 },
      ].map((stat, i) => (
        <div
          key={i}
          className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-600/20"
        >
          <div
            className="counter text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
            data-target={stat.value}
          >
            0
          </div>
          <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 5. PROGRESS BAR
// ==========================================
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = ref.current?.querySelectorAll(".progress-bar");

    bars?.forEach((bar) => {
      const target = parseInt(bar.getAttribute("data-width") || "0");

      gsap.fromTo(
        bar,
        { width: 0 },
        {
          width: `${target}%`,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    });
  }, []);

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-3xl font-bold mb-8">Skills Progress</h2>
      {["React", "Node.js", "TypeScript", "Design"].map((skill, i) => (
        <div key={i}>
          <div className="flex justify-between mb-2">
            <label className="font-semibold">{skill}</label>
            <span className="text-purple-400">{(i + 1) * 25}%</span>
          </div>
          <div className="w-full h-3 bg-dark-surface rounded-full overflow-hidden border border-purple-600/20">
            <div
              className="progress-bar h-full bg-gradient-to-r from-purple-600 to-pink-600"
              data-width={(i + 1) * 25}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 6. PIN & ANIMATION
// ==========================================
export function PinAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".pin-box", {
        x: 500,
        rotation: 360,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          pin: true,
          markers: false,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="h-96 flex items-center justify-center">
      <div className="pin-box w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg" />
    </div>
  );
}

// ==========================================
// 7. CLIP-PATH REVEAL
// ==========================================
export function ClipPathReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        opacity: 0,
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <div
      ref={ref}
      className="h-80 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center"
    >
      <h2 className="text-4xl font-bold text-white">Clip-Path Reveal</h2>
    </div>
  );
}

// ==========================================
// 8. ROTATE & SCALE
// ==========================================
export function RotateScale() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <div ref={ref} className="flex justify-center items-center h-40">
      <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-xl" />
    </div>
  );
}

// ==========================================
// 9. TEXT ANIMATION
// ==========================================
export function TextAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <div ref={ref} className="text-center py-12">
      <h2 className="text-4xl font-bold">
        <span className="word inline-block mr-2">Animations</span>
        <span className="word inline-block mr-2">fluides</span>
        <span className="word inline-block mr-2">et</span>
        <span className="word inline-block">modernes</span>
      </h2>
    </div>
  );
}

// ==========================================
// 10. TIMELINE ANIMATION
// ==========================================
export function TimelineAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      ".timeline-item-1",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        ".timeline-item-2",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        ".timeline-item-3",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      );
  }, []);

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-3xl font-bold mb-8">Timeline Animation</h2>

      <div className="timeline-item-1 p-6 bg-dark-surface border border-purple-600/30 rounded-lg">
        <h3 className="font-bold text-purple-400">Step 1</h3>
        <p className="text-gray-400 text-sm">Premier élément animé</p>
      </div>

      <div className="timeline-item-2 p-6 bg-dark-surface border border-pink-600/30 rounded-lg">
        <h3 className="font-bold text-pink-400">Step 2</h3>
        <p className="text-gray-400 text-sm">Deuxième élément animé</p>
      </div>

      <div className="timeline-item-3 p-6 bg-dark-surface border border-purple-600/30 rounded-lg">
        <h3 className="font-bold text-purple-400">Step 3</h3>
        <p className="text-gray-400 text-sm">Troisième élément animé</p>
      </div>
    </div>
  );
}
