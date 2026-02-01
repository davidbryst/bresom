import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "A propos", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Initial animation on mount
  useEffect(() => {
    if (typeof window === "undefined" || !navRef.current) return;

    const ctx = gsap.context(() => {
      // Nav slide down
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "power2.out" },
        );
      }

      // Links stagger animation
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".nav-link");
        gsap.fromTo(
          links,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.4,
            ease: "power2.out",
          },
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.8,
            ease: "back.out(1.7)",
          },
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Scroll detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });

      gsap.to(mobileMenuRef.current.querySelector(".mobile-panel"), {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      const links = mobileLinksRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(
        links,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.2,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(mobileMenuRef.current.querySelector(".mobile-panel"), {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        delay: 0.1,
      });
    }
  }, [isMobileMenuOpen]);

  // Hover animations for nav links
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#7C3AED",
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#8B8B9B",
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Logo hover
  const handleLogoHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLogoLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // CTA hover
  const handleCtaHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCtaLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark-deep/90 backdrop-blur-lg border-b border-dark-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              ref={logoRef}
              href="#hero"
              onMouseEnter={handleLogoHover}
              onMouseLeave={handleLogoLeave}
              className="text-xl md:text-2xl font-bold text-light-primary"
            >
              <span className="text-transparent bg-clip-text bg-gradient-violet">
                DA
              </span>
              <span className="text-light-primary">.</span>
            </a>

            {/* Desktop Navigation */}
            <div ref={linksRef} className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  className="nav-link px-4 py-2 text-sm text-light-secondary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              href="#contact"
              onMouseEnter={handleCtaHover}
              onMouseLeave={handleCtaLeave}
              className="hidden lg:block px-5 py-2.5 bg-gradient-violet text-white text-sm font-semibold rounded-lg shadow-glow-violet transition-all duration-300"
            >
              Discutons
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-light-primary transition-transform active:scale-90"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 lg:hidden opacity-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-dark-deep/80 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className="mobile-panel absolute right-0 top-0 h-full w-3/4 max-w-sm bg-dark-surface border-l border-dark-border p-6 pt-24"
          style={{ transform: "translateX(100%)" }}
        >
          <div ref={mobileLinksRef} className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-link px-4 py-3 text-light-secondary hover:text-violet-accent hover:bg-dark-card rounded-lg transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-link mt-4 px-4 py-3 bg-gradient-violet text-white font-semibold rounded-lg text-center"
            >
              Discutons
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
