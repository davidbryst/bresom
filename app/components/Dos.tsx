import { Typography } from "@material-tailwind/react"; // ou ton propre composant typographique
// import { Code, Paintbrush, Users } from "lucide-react"; // Exemple avec lucide-react

export const dos = [
  {
    titre: "Développement Web",
    description: "Création de sites performants, modernes et accessibles.",
    // icon: Code,
  },
  {
    titre: "Design UI/UX",
    description: "Conception d’interfaces intuitives et esthétiques.",
    // icon: Paintbrush,
  },
  {
    titre: "Travail en équipe",
    description: "Collaboration agile avec les clients et les développeurs.",
    // icon: Users,
  },
];

export default function Dos() {
  return (
    <section id="Dos" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Mes Activitées
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dos.map((da, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5">
                <div className="flex items-center justify-center mb-4">
                  {/* <da.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" /> */}
                </div>
                <Typography variant="h3" className="text-xl font-semibold mb-2 text-white text-center">
                  {da.titre}
                </Typography>
                <p className="text-white/80 text-center text-sm">{da.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
