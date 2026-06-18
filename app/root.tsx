import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import "./styles/lite.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F2EEE6" />
        <Meta />
        <Links />
      </head>
      <body className="lite lite-grain bg-paper text-ink font-body antialiased min-h-screen">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:px-5 focus:py-3 focus:bg-vermilion focus:text-white focus:font-mono focus:text-sm focus:outline-none"
        >
          Aller au contenu principal
        </a>
        {children}
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
      <body className="lite bg-paper text-ink antialiased min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <p className="font-mono text-xs tracking-[0.3em] text-vermilion mb-6">
            ERREUR — 500
          </p>
          <h1 className="lite-display text-6xl sm:text-8xl mb-6">Oops.</h1>
          <p className="text-lg text-ink/60 mb-10 max-w-md mx-auto">
            Une erreur est survenue. Revenons sur la bonne voie.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-ink text-paper font-mono text-sm uppercase tracking-wider hover:bg-vermilion transition-colors"
          >
            Retour à l&apos;accueil
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
