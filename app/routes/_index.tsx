import type { MetaFunction } from "@remix-run/node";
import Hero from "../../app/components/Hero";
import Skills from "../../app/components/Skills";
import Projects from "../../app/components/Projects";
import Contact from "../../app/components/Contact";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Effet de fond avec points lumineux */}
      {/* <div className="fixed inset-0">
        <div className="absolute inset-0">
          <div className="absolute w-full h-full">
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full top-20 left-1/4"></div>
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full top-40 right-1/3"></div>
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full bottom-32 left-1/3"></div>
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full top-1/2 right-1/4"></div>
          </div>
        </div>
      </div> */}

      {/* Contenu principal avec effet glassmorphisme */}
      <div className="relative z-10 pt-10">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}

