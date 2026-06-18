import {
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Context for Lenis
interface LenisContextType {
  lenis: Lenis | null;
  enableSnap: () => void;
  disableSnap: () => void;
  isSnapping: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  enableSnap: () => {},
  disableSnap: () => {},
  isSnapping: false,
});

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
  enableSnapByDefault?: boolean;
}

export function SmoothScrollProvider({
  children,
  enableSnapByDefault = false,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isSnapping, setIsSnapping] = useState(enableSnapByDefault);
  const snapTriggersRef = useRef<ScrollTrigger[]>([]);

  const enableSnap = () => setIsSnapping(true);
  const disableSnap = () => setIsSnapping(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // On mobile we deliberately DON'T run Lenis: native touch scrolling is
    // hardware-accelerated and runs off the main thread, so it stays smooth
    // even while GSAP is busy. Lenis (JS-driven scroll) ties scrolling to the
    // main thread and stutters on phones. ScrollTrigger works fine on native
    // scroll without Lenis.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Smooth scroll to an in-page anchor — uses Lenis when present (desktop),
    // otherwise native smooth scroll with the same 80px header offset.
    const scrollToHash = (href: string) => {
      const element = document.querySelector(href);
      if (!element) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element as HTMLElement, {
          offset: -80,
          duration: 1.5,
        });
      } else {
        const top =
          (element as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          scrollToHash(href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    if (isMobile) {
      // Native scroll only — no Lenis, no extra RAF.
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    // Initialize Lenis with optimized settings (desktop)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for smooth animation
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Setup global section snapping
  useEffect(() => {
    if (typeof window === "undefined" || !isSnapping) {
      // Clean up existing snap triggers when disabled
      snapTriggersRef.current.forEach((trigger) => trigger.kill());
      snapTriggersRef.current = [];
      return;
    }

    // Get all main sections for snapping
    const sections = document.querySelectorAll("section[id]");

    if (sections.length === 0) return;

    // Create snap triggers for each section
    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        snap: {
          snapTo: 1,
          duration: { min: 0.3, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut",
        },
      });
      snapTriggersRef.current.push(trigger);
    });

    return () => {
      snapTriggersRef.current.forEach((trigger) => trigger.kill());
      snapTriggersRef.current = [];
    };
  }, [isSnapping]);

  return (
    <LenisContext.Provider
      value={{
        lenis: lenisRef.current,
        enableSnap,
        disableSnap,
        isSnapping,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}

// Hook for section-based snap scrolling
export function useSnapScroll(sectionIds: string[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id, index) => {
      const section = document.getElementById(id);
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        snap: {
          snapTo: (progress, self) => {
            // Snap to nearest section boundary
            const snapPoints = sectionIds.map(
              (_, i) => i / (sectionIds.length - 1),
            );
            const closest = snapPoints.reduce((prev, curr) =>
              Math.abs(curr - progress) < Math.abs(prev - progress)
                ? curr
                : prev,
            );
            return closest;
          },
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [sectionIds]);
}

// Component for enabling snap on specific sections
interface SnapSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export function SnapSection({
  children,
  id,
  className = "",
}: SnapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      snap: {
        snapTo: 1,
        duration: { min: 0.2, max: 0.4 },
        ease: "power1.inOut",
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}

// Global scroll progress indicator
export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-1 w-full bg-gradient-to-r from-violet-primary via-violet-accent to-pink-primary z-[100] origin-left"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

// Section navigation dots
interface SectionNavProps {
  sections: { id: string; label: string }[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: 0, duration: 1.2 });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
            activeIndex === index
              ? "bg-violet-primary scale-125 shadow-glow-violet"
              : "bg-dark-border hover:bg-violet-primary/50"
          }`}
          aria-label={section.label}
        >
          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-dark-surface rounded text-xs text-light-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default SmoothScrollProvider;
