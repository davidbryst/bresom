import { Button, Typography } from "@material-tailwind/react";
import { useRef } from "react";

export default function Hero() {
  const textRef = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  setInterval(() => {
    textRef[0].current?.classList.toggle("animate-change");
    textRef[1].current?.classList.toggle("animate-change1");
  }, 5000);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Contenu du Hero */}
      <div className="relative z-10 text-center text-white px-4">
        <Typography className="text-xl mb-4">
          Salut 👋 Je suis
        </Typography>
        <Typography variant="h1" className="text-5xl md:text-7xl font-bold mb-4 text-white">
          DAVID ABRAHAM
        </Typography>
        <Typography className="text-white/70 mb-2">
          Un passionné en
        </Typography>
        {/* <div className="h-5"></div> */}
        <div className="">
          <div className="h-10 transition-all duration-[5s] overflow-hidden ">
            <div ref={textRef[0]} className="flex flex-col gap-0 transition-all duration-[2s] ">
              <Typography className="text-center text-white text-2xl md:text-3xl font-semibold">
                Graphisme & Design
              </Typography>
              <Typography className="text-center text-white text-2xl md:text-3xl font-semibold">
                Développement Web & Mobile
              </Typography>
            </div>
          </div>
          <div className="h-0.5 my-2 bg-withe rounded-full" ></div>
          <Typography className="h-6 transition-all duration-[5s] overflow-hidden text-white/70 mb-8 max-w-2xl mx-auto ">
            <div ref={textRef[1]} className="flex flex-col gap-0 transition-all duration-[2s] animate-base ">
              <span  className="text-center ">Spécialisé dans la création de sites web et applications interactives.</span>
              <span  className="text-center ">Spécialisé dans le design de sites web et applications interactives.</span>
            </div>
          </Typography>
        </div>
        {/* <div className="h-2"></div> */}
        <div className="mt-8">
          <div className="w-48 h-48 mx-auto mb-8 rounded-lg overflow-hidden ring-2 ring-white/10">
            <img 
              src="/profile.jpg" 
              alt="Asfakur Nariz" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <Button 
            size="lg" 
            className="bg-white/10 text-white flex items-center gap-2 mx-auto hover:bg-white/20 transition-all duration-300"
          >
            Resume <span className="text-xl">↗</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 