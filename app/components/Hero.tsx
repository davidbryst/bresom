 
import { useEffect, useRef } from "react";
import ShaderPrismBackground from "./ShaderPrismBackground";
import TypewriterEffect from "./TypewriterEffect";
import { heroData } from "../data/content";

export default function Hero() {
  const primaryLinesRef = useRef<HTMLDivElement>(null);
  const secondaryLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      primaryLinesRef.current?.classList.toggle("animate-change");
      secondaryLinesRef.current?.classList.toggle("animate-change1");
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);
  return (
    <>
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 border-b-2 border-white/20">
    <ShaderPrismBackground />
      
      {/* Contenu du Hero */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
        <p className="text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">
          {heroData.greeting}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
          {heroData.name}
        </h1>
        <p className="text-gray-700 dark:text-white/70 mb-2 text-sm sm:text-base">
          {heroData.subtitle}
        </p>
        
        <div className="">
          {/* Effet d'écriture et d'effacement pour les lignes principales */}
          <div className="flex flex-col items-center justify-center">
            <TypewriterEffect lines={[...heroData.primaryLines, ...heroData.secondaryLines]} />
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8">
          <div className="w-40 h-40 cardGlass sm:w-56 sm:h-56 md:w-60 md:h-60 mx-auto mb-6 sm:mb-8 overflow-hidden ring-2 ring-white/10">
            <img 
              src="/profile.jpg" 
              alt="David Abraham" 
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          <button
            type="button"
            aria-label="Télécharger le CV"
            className="flex items-center gap-2 mx-auto font-bold cardGlass text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover:border-white/50 hover:bg-white/5"
            onClick={() => { window.open('/cv.pdf', '_blank'); }}
          >
            Télécharger le CV <span className="text-lg sm:text-xl">↗</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
} 