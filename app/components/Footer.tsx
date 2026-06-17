import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { icon: Github, href: "https://github.com/davidabraham", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/davidabraham",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/davidabraham",
    label: "Twitter",
  },
  { icon: Mail, href: "mailto:sh.david.abraham@gmail.com", label: "Email" },
];

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "A propos", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const navSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !footerRef.current) return;

    const ctx = gsap.context(() => {
      // Logo section animation
      if (logoSectionRef.current) {
        const logo = logoSectionRef.current.querySelector(".footer-logo");
        const desc = logoSectionRef.current.querySelector(".footer-desc");
        const socials = logoSectionRef.current.querySelectorAll(".social-link");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          logo,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
        )
          .fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            socials,
            { opacity: 0, y: 20, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.2"
          );

        // Social link hover animations
        socials.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, {
              y: -4,
              scale: 1.1,
              borderColor: "rgba(124, 58, 237, 0.5)",
              color: "#7C3AED",
              duration: 0.3,
              ease: "power2.out",
            });
          });

          link.addEventListener("mouseleave", () => {
            gsap.to(link, {
              y: 0,
              scale: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "#8B8B9B",
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Nav section animation
      if (navSectionRef.current) {
        const title = navSectionRef.current.querySelector(".nav-title");
        const links = navSectionRef.current.querySelectorAll(".nav-link");

        gsap.fromTo(
          [title, ...links],
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Nav link hover
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, {
              x: 6,
              color: "#7C3AED",
              duration: 0.2,
              ease: "power2.out",
            });
          });

          link.addEventListener("mouseleave", () => {
            gsap.to(link, {
              x: 0,
              color: "#8B8B9B",
              duration: 0.2,
              ease: "power2.out",
            });
          });
        });
      }

      // Contact section animation
      if (contactSectionRef.current) {
        const title = contactSectionRef.current.querySelector(".contact-title");
        const items = contactSectionRef.current.querySelectorAll(".contact-item");

        gsap.fromTo(
          [title, ...items],
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Bottom bar animation
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Heart beat animation
      if (heartRef.current) {
        gsap.to(heartRef.current, {
          scale: 1.2,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-dark-surface border-t border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-40">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div ref={logoSectionRef}>
            <a
              href="#hero"
              className="footer-logo text-2xl font-bold text-light-primary inline-block mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-violet">
                DA
              </span>
              <span className="text-light-primary">.</span>
            </a>
            <p className="footer-desc text-light-secondary text-sm leading-relaxed mb-6">
              Développeur Full Stack & Designer UI/UX passionné par la création
              d'expériences digitales élégantes et performantes.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link w-10 h-10 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-light-muted transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div ref={navSectionRef}>
            <h4 className="nav-title text-light-primary font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="nav-link text-light-secondary text-sm transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactSectionRef}>
            <h4 className="contact-title text-light-primary font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-light-secondary">
              <li className="contact-item">
                <span className="text-light-muted">Email:</span>
                <br />
                <a
                  href="mailto:sh.david.abraham@gmail.com"
                  className="hover:text-violet-accent transition-colors"
                >
                  sh.david.abraham@gmail.com
                </a>
              </li>
              <li className="contact-item">
                <span className="text-light-muted">Téléphone:</span>
                <br />
                +225 01 40 54 41 97
              </li>
              <li className="contact-item">
                <span className="text-light-muted">Localisation:</span>
                <br />
                Abidjan, Côte d'Ivoire
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-light-muted text-sm text-center md:text-left">
            © {new Date().getFullYear()} David Abraham. Tous droits réservés.
          </p>
          <p className="text-light-muted text-sm flex items-center gap-1">
            Fait avec{" "}
            <span ref={heartRef}>
              <Heart className="w-4 h-4 text-violet-accent fill-violet-accent" />
            </span>{" "}
            et React
          </p>
        </div>
      </div>
    </footer>
  );
}
