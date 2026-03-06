import type { MetaFunction } from "@remix-run/node";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import About from "~/components/About";
import Services from "~/components/Services";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";
import Experience from "~/components/Experience";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";
import ScrollVelocity from "~/components/ScrollVelocity";
import { aboutData, contactData } from "~/data/content";

export const meta: MetaFunction = () => {
  const siteUrl = "https://davidabraham.vercel.app"; // ✅ Remplacez par votre vraie URL
  const title = "David Abraham | Développeur Full Stack & Designer UI/UX";
  const description =
    "Portfolio de David Abraham - Développeur Web & Mobile Full Stack et Designer UI/UX. Création de sites web et applications performantes, modernes et accessibles.";
  const imageUrl = `${siteUrl}/face-identiter-large.jpg`; // ✅ Image de preview

  // ✅ Structured Data (JSON-LD) pour le SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David Abraham",
    jobTitle: "Développeur Full Stack & Designer UI/UX",
    url: siteUrl,
    image: imageUrl,
    description: aboutData.description,
    email: contactData.email,
    telephone: contactData.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abidjan",
      addressRegion: "Cocody",
      addressCountry: "CI",
    },
    sameAs: [
      // ✅ Ajoutez vos profils sociaux
      // "https://github.com/votreprofil",
      // "https://linkedin.com/in/votreprofil",
    ],
    knowsAbout: [
      "Développement Web",
      "React",
      "Remix",
      "Next.js",
      "TypeScript",
      "Node.js",
      "UI/UX Design",
      "Figma",
      "Développement Mobile",
      "React Native",
    ],
  };

  return [
    // Balises de base
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "développeur, full stack, react, remix, nextjs, typescript, ui/ux, design, web, mobile, abidjan, côte d'ivoire",
    },
    { name: "author", content: "David Abraham" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "fr" },
    { name: "revisit-after", content: "7 days" },

    // ✅ Open Graph (Facebook, LinkedIn, etc.)
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: siteUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "David Abraham Portfolio" },
    { property: "og:locale", content: "fr_FR" },

    // ✅ Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    // { name: "twitter:site", content: "@votrecompte" }, // Ajoutez si vous avez Twitter
    // { name: "twitter:creator", content: "@votrecompte" },

    // ✅ Canonical URL
    { tagName: "link", rel: "canonical", href: siteUrl },

    // ✅ Structured Data JSON-LD
    {
      "script:ld+json": structuredData,
    },
  ];
};

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-dark-deep text-light-primary min-h-screen"
      >
        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main id="main-content" role="main">
          {/* 1. HOOK - Première impression */}
          <Hero />

          {/* Separator */}
          <div className="py-6 sm:py-8 bg-[#000] z-40">
            <ScrollVelocity
              texts={["QUI SUIS-JE ✦", "MON HISTOIRE ✦", "À PROPOS ✦", "DÉCOUVREZ ✦"]}
              velocity={50}
              numCopies={8}
              className="custom-scroll-text text-violet-primary sm:text-6xl"
            />
          </div>

          {/* 2. CONNEXION - Qui je suis (connexion personnelle immédiate) */}
          <About />

          {/* Separator */}
          <div className="py-6 sm:py-8 bg-[#000] z-40">
            <ScrollVelocity
              texts={["PROJETS ✦", "RÉALISATIONS ✦", "PORTFOLIO ✦", "TRAVAUX ✦"]}
              velocity={50}
              numCopies={8}
              className="custom-scroll-text text-violet-primary sm:text-6xl"
            />
          </div>

          {/* 3. PREUVE - Portfolio concret (avec CTA intégré) */}
          <Projects />

          {/* 4. VALEUR - Ce que je peux faire pour VOUS */}
          <Services />

          {/* Separator */}
          <div className="py-6 sm:py-8 bg-[#000] z-40">
            <ScrollVelocity
              texts={["REMIX ✦", "TYPESCRIPT ✦", "SUPABASE ✦", "FIGMA ✦"]}
              velocity={50}
              numCopies={8}
              className="custom-scroll-text text-violet-primary sm:text-6xl"
            />
          </div>

          {/* 5. COMPÉTENCES - Expertise technique (avec CTA intégré) */}
          <Skills />

          {/* 6. AUTORITÉ - Parcours professionnel */}
          <Experience />

          {/* Separator with CTA message */}
          <div className="py-8 sm:py-10 md:py-12 bg-[#000] z-40">
            <ScrollVelocity
              texts={["DISPONIBLE ✦", "CONTACTEZ-MOI ✦", "PARLONS PROJET ✦", "DISCUTONS ✦"]}
              velocity={50}
              numCopies={8}
              className="custom-scroll-text text-violet-primary sm:text-6xl"
            />
          </div>

          {/* 7. ACTION - Appel à l'action final */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to top button */}
        <ScrollToTop />
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)" }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-violet rounded-full shadow-glow-violet flex items-center justify-center z-50 text-white"
      aria-label="Retour en haut"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  );
}
