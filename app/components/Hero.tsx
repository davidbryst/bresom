import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import ShaderPrismBackground from "./ShaderPrismBackground";

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
        <Typography className="text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">
          Salut 👋 Je suis
        </Typography>
        <Typography variant="h1" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
          DAVID ABRAHAM
        </Typography>
        <Typography className="text-gray-700 dark:text-white/70 mb-2 text-sm sm:text-base">
          Un passionné en
        </Typography>
        
        <div className="">
          <div className="h-8 sm:h-10 transition-all duration-[5s] overflow-hidden">
            <div ref={primaryLinesRef} className="flex flex-col gap-0 transition-all duration-[2s]">
              <div className="text-center text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Graphisme & Design
              </div>
              <div className="text-center text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Développement Web & Mobile
              </div>
            </div>
          </div>
          <div className="h-0.5 my-2 bg-gray-300 dark:bg-white rounded-full max-w-xs mx-auto"></div>
          <div className="h-6 sm:h-8 transition-all duration-[5s] overflow-hidden text-gray-700 dark:text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            <div ref={secondaryLinesRef} className="flex flex-col gap-0 duration-[2s] animate-base">
              <span className="text-center px-2">Spécialisé dans la création de sites web et applications interactives.</span>
              <span className="text-center px-2">Spécialisé dans le design de sites web et applications interactives.</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8 rounded-lg overflow-hidden ring-2 ring-white/10">
            <img 
              src="/profile.jpg" 
              alt="David Abraham" 
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          <Button 
            size="lg" 
            aria-label="Télécharger le CV"
            className="flex items-center gap-2 mx-auto transition-all duration-300 border-2 border-white/10 bg-white/10 text-white hover:border-white/30 hover:bg-white/20 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
          >
            Resume <span className="text-lg sm:text-xl">↗</span>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
} 