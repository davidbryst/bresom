import { Typography } from "@material-tailwind/react";
import { Code, Paintbrush, Smartphone } from "lucide-react";
import EffectBackground from "./effectBakground";

export const dos = [
  {
    titre: "Développement Web",
    description: "Création de sites performants, modernes et accessibles.",
    icon: Code,
  },
  {
    titre: "Développement Mobile",
    description: "Création d'applications mobiles natives et cross-platform.",
    icon: Smartphone,
  },
  {
    titre: "Design UI/UX",
    description: "Conception d'interfaces intuitives et esthétiques.",
    icon: Paintbrush,
  },
  // {
  //   titre: "Travail en équipe",
  //   description: "Collaboration agile avec les clients et les développeurs.",
  //   icon: Users,
  // },
];

export default function Dos() {
  const items = dos.map((da, index) => (
    <div 
      key={index} 
      className="group relative overflow-hidden rounded-xl border transition-all duration-300 border-white/10 hover:border-white/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-4 sm:p-6 bg-black/40 text-white">
        <div className="flex items-center justify-center mb-3 sm:mb-4" aria-hidden="true">
          <da.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <Typography variant="h3" className="text-lg sm:text-xl font-semibold mb-2 text-white text-center">
          {da.titre}
        </Typography>
        <p className="text-white/80 text-center text-sm sm:text-base leading-relaxed">{da.description}</p>
      </div>
    </div>
  ))

  return (
    <section id="Dos" aria-labelledby="dos-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative min-h-[70vh] flex items-center justify-center border-y-2 border-white/20">
      <EffectBackground />
      <div className="max-w-6xl mx-auto w-full">
        <Typography id="dos-title" variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Mes Activités
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items}
        </div>
      </div>
    </section>
  );
}
