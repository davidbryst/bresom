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

export const meta: MetaFunction = () => {
  return [
    { title: "David Abraham | Développeur Full Stack & Designer UI/UX" },
    {
      name: "description",
      content:
        "Portfolio de David Abraham - Développeur Web & Mobile Full Stack et Designer UI/UX. Création de sites web et applications performantes, modernes et accessibles.",
    },
    {
      name: "keywords",
      content:
        "développeur, full stack, react, ui/ux, design, web, mobile, abidjan",
    },
    {
      property: "og:title",
      content: "David Abraham | Développeur Full Stack & Designer UI/UX",
    },
    {
      property: "og:description",
      content:
        "Portfolio de David Abraham - Développeur Web & Mobile Full Stack et Designer UI/UX.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
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
        <main>
          <Hero />
          <About />
          <div className="py-12 bg-[#000] z-40">
            <ScrollVelocity
              texts={["REMIX ✦", "TYPESCRIPT ✦", "SUPABASE ✦", "FIGMA ✦"]}
              velocity={50}
              numCopies={8}
              className="custom-scroll-text text-violet-primary sm:text-6xl"
            />
          </div>
          <Services />
          <div className="py-12 bg-[#000] z-40">
            <ScrollVelocity
              texts={["REMIX ✦", "TYPESCRIPT ✦", "SUPABASE ✦", "FIGMA ✦"]}
              velocity={50}
              numCopies={8}
              className="custom-scroll-text text-violet-primary sm:text-6xl"
            />
          </div>
          <Skills />
          <Projects />
          <Experience />
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
