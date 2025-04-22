import { Button, Typography } from "@material-tailwind/react";
import BackgroundParticles from "./BackgroundParticles";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond avec les vagues */}
      <BackgroundParticles />
      
      {/* Contenu du Hero */}
      <div className="relative z-10 text-center text-white px-4">
        <Typography className="text-xl mb-4">
          Hey 👋 I&apos;m
        </Typography>
        <Typography variant="h1" className="text-5xl md:text-7xl font-bold mb-4 text-white">
          Asfakur Nariz
        </Typography>
        <Typography className="text-white/70 mb-2">
          A passionate
        </Typography>
        <Typography className="text-white text-2xl md:text-3xl font-semibold mb-6">
          Graphics Designer
        </Typography>
        <Typography className="text-white/70 mb-8 max-w-2xl mx-auto">
          specialized in building stunning pixel-perfect interactive websites/applications.
        </Typography>
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