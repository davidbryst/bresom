import { Typography } from "@material-tailwind/react";
import BackgroundParticles from "./BackgroundParticles";

export default function About() {
  return (
    <section id="About" aria-labelledby="about-title" className="py-12 sm:py-32 lg:py-32 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <Typography id="about-title" variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-white">
          À propos de moi
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-black/30 p-4 sm:p-6 text-white">
            <Typography className="text-white/90 mb-4 text-sm sm:text-base leading-relaxed">
              Passionné par le design et le développement, j'aide les équipes à concevoir et livrer des produits web et mobiles fiables, performants et élégants. J'aime transformer des idées en interfaces utiles, accessibles et modernes.
            </Typography>
            <ul className="space-y-2 text-white/80 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="mt-2 w-1.5 h-1.5 bg-white/70 rounded-full mr-2 flex-shrink-0"></span>
                <span>Conception UI/UX et intégration pixel‑perfect.</span>
              </li>
              <li className="flex items-start">
                <span className="mt-2 w-1.5 h-1.5 bg-white/70 rounded-full mr-2 flex-shrink-0"></span>
                <span>Développement front‑end React/Remix/Next et mobile React Native.</span>
              </li>
              <li className="flex items-start">
                <span className="mt-2 w-1.5 h-1.5 bg-white/70 rounded-full mr-2 flex-shrink-0"></span>
                <span>API, bases de données et bonnes pratiques de qualité (tests, accessibilité).</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4 sm:p-6 text-white">
            <div className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-white/60">Expérience</p>
                <p className="text-xl sm:text-2xl font-semibold">3+ ans</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/60">Stack</p>
                <p className="text-sm sm:text-lg">TypeScript, React, Remix, Node.js</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/60">Valeurs</p>
                <p className="text-sm sm:text-lg">Qualité, simplicité, professionnalisme</p>
              </div>
            </div>
          </div>
          
          <div className="w-full h-48 sm:h-64 lg:h-full mb-4 lg:mb-0 rounded-lg overflow-hidden ring-2 ring-white/10">
            <img 
              src="/profile.jpg"
              alt="profil"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


