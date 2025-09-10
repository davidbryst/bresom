import { Typography } from "@material-tailwind/react";
import BackgroundParticles from "./BackgroundParticles";
import Card from "./Card";

type ExperienceItem = {
  company: string;
  position: string;
  date: string;
  responsibilities: string[];
};

import { experiencesData } from "../data/content";

export default function Experiences() {
  return (
    <section id="Experiences" aria-labelledby="experiences-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2
          id="experiences-title"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white"
        >
          Mes Expériences Professionnelles
        </h2>
        <div className="grid grid-cols-3 gap-6 sm:gap-8">
          {experiencesData.map((exp) => (
            <div
              key={`${exp.company}-${exp.date}`}
              className="group relative overflow-hidden rounded-xl border transition-all duration-300 border-white/10 hover:border-white/20"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              <div className="relative p-4 sm:p-6 cardGlass !bg-black/1 text-white">
                <h3 className="text-lg sm:text-2xl font-semibold mb-2 text-white">
                  {exp.company}
                </h3>
                <p className="text-sm sm:text-base text-white/85 mb-2 leading-relaxed">{exp.position}</p>
                <p className="text-xs sm:text-sm text-white/85 mb-3 sm:mb-4">{exp.date}</p>
                {exp.responsibilities.length > 0 && (
                  <ul className="space-y-2 sm:space-y-3">
                    {exp.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex items-start text-white/90">
                        <span className="mt-2 w-1.5 h-1.5 bg-white/90 rounded-full mr-2 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 