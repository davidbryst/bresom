import { Typography } from "@material-tailwind/react";
import EffectBackground from "./effectBakground";
import Card from "./Card";
import { dosData } from "app/data/content";



export default function Dos() {
  const items = dosData.map((da, index) => (
    <div 
      key={index} 
      className="group relative overflow-hidden rounded-xl border transition-all duration-300 border-white/10 hover:border-white/20"
    >

      {/* <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
      <div className="relative p-4 sm:p-6 cardGlass ">
        <div className="flex items-center justify-center mb-3 sm:mb-4" aria-hidden="true">
          <da.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white text-center">
          {da.titre}
        </h3>
        <p className="text-white/80 text-center text-sm sm:text-base leading-relaxed">{da.description}</p>
      </div>
    </div>
  ))

  return (
    <section id="Dos" aria-labelledby="dos-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative min-h-[70vh] flex items-center justify-center border-y-2 border-white/20">
      <EffectBackground />
      <div className="max-w-6xl mx-auto w-full">
        <h2 id="dos-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Mes Activités
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items}
        </div>
      </div>
    </section>
  );
}
