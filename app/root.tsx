import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initializeGSAP } from "~/config/gsapConfig";
import {
  SmoothScrollProvider,
  ScrollProgress,
  SectionNav,
} from "~/components/SmoothScroll";

import "./tailwind.css";
import "./styles/animations.css";

// Enregistrer les plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Initialize GSAP configuration
  initializeGSAP();
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
  },
];

// Main sections for navigation - Story-first approach
const mainSections = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "projects", label: "Projets" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "contact", label: "Contact" },
];

function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // GSAP defaults are now configured via initializeGSAP() in config
    // Cleanup ScrollTriggers on navigation
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Global scroll progress indicator */}
      {/* <ScrollProgress /> */}
      {/* Section navigation dots */}
      {/* <SectionNav sections={mainSections} /> */}
      {children}
    </SmoothScrollProvider>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0B0F" />
        <Meta />
        <Links />
      </head>
      <body className="bg-dark-deep text-light-primary antialiased">
        {/* ✅ Skip links pour l'accessibilité */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-violet-accent focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-light"
        >
          Aller au contenu principal
        </a>
        <a
          href="#contact"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-52 focus:z-50 focus:px-6 focus:py-3 focus:bg-violet-accent focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-light"
        >
          Aller au formulaire de contact
        </a>

        <GSAPProvider>{children}</GSAPProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Erreur | David Abraham</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-dark-deep text-light-primary antialiased min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold text-violet-accent mb-4">Oops!</h1>
          <p className="text-xl text-light-secondary mb-8">
            Une erreur est survenue. Veuillez réessayer.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet hover:scale-105 transition-transform"
          >
            Retour à l'accueil
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
