import { Typography } from "@material-tailwind/react";
import BackgroundParticles from "./BackgroundParticles";
import { aboutData } from "../data/content";

export default function About() {
  return (
    <section id="About" aria-labelledby="about-title" className="py-12 sm:py-32 lg:py-32 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 id="about-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-white">
          À propos de moi
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 font-medium">
          <div className="lg:col-span-2  p-4 sm:p-6 cardGlass">
            <p className="text-white  mb-4 text-base sm:text-lg leading-relaxed">
              {aboutData.description}
            </p>
            <ul className="space-y-2 text-white/80 text-base sm:text-lg">
              {aboutData.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-2 w-1.5 h-1.5 bg-white/90 rounded-full mr-2 flex-shrink-0"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className=" p-4 sm:p-6 cardGlass">
            <div className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-white/80">Expérience</p>
                <p className="text-xl sm:text-xl font-semibold">{aboutData.experience}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/80">Stack</p>
                <p className="text-sm sm:text-xl font-semibold">{aboutData.stack}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/80">Valeurs</p>
                <p className="text-sm sm:text-xl font-semibold">{aboutData.values}</p>
              </div>
            </div>
          </div>
          
          <div className="cardGlass overflow-hidden ring-2 ring-white/10">
            <img 
              src="/profile.jpg"
              alt="profil"
              className="w-full h-full object-cover  transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


