import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollProvider } from "~/components/SmoothScroll";

import "./tailwind.css";
import "./styles/animations.css";

// Enregistrer les plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
  },
];

function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configure GSAP defaults for premium feel
    gsap.defaults({
      ease: "power3.out",
      duration: 0.8,
    });

    // Refresh ScrollTrigger on navigation
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
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
        <GSAPProvider>
          {children}
        </GSAPProvider>
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
