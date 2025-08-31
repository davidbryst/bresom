import { Typography } from "@material-tailwind/react";
import BackgroundParticles from "./BackgroundParticles";

type ExperienceItem = {
  company: string;
  position: string;
  date: string;
  responsibilities: string[];
};

const experiencesProfessionnelles: ExperienceItem[] = [
  {
    company: "SCHIBA HOLDING",
    position: "Infographe, Développeur Web & Mobile Full Stack",
    date: "SEPT 2024 - DÉC 2025",
    responsibilities: [
      "Développement et maintenance de plusieurs applications web pour une douzaine de filiales du groupe Schiba Holding (front-end, back-end et base de données).",
      "Intégration d'API tierces (paiements en ligne, gestion d'utilisateurs).",
      "Conception d'éléments graphiques, illustrations et supports visuels clairs et engageants."
    ] 
  },
  {
    company: "EMAIV-JC", 
    position: "Infographe, Développeur Web & Mobile Full Stack",
    date: "JANV 2024 - AOÛT 2024",
    responsibilities: [
      "Développement et maintenance d'applications web de prise de rendez-vous pour des projets voyage, immigration et de visa (front-end, back-end et base de données).",
      "Création d'éléments graphiques et visuels pour une communication claire et efficace."
    ]
  },
  {
    company: "BIM GROUPE",
    position: "Développeur Mobile",
    date: "JUIL 2022 - SEPT 2023",
    responsibilities: [
      "Conception et développement d'interfaces attrayantes et intuitives, optimisées pour différents appareils.",
      "Garantie d'un affichage cohérent et d'une expérience utilisateur optimale sur divers écrans.",
      "Collaboration avec les développeurs front-end pour intégrer les conceptions et résoudre les problèmes techniques."
    ]
  }
];

export default function Experiences() {
  return (
    <section id="Experiences" aria-labelledby="experiences-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <Typography id="experiences-title" variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Mes Expériences Professionnelles
        </Typography>
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {experiencesProfessionnelles.map((exp) => (
            <div
              key={`${exp.company}-${exp.date}`}
              className="group relative overflow-hidden rounded-xl border transition-all duration-300 border-gray-200 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-4 sm:p-6 bg-white/90 text-gray-800 dark:bg-white/20 dark:text-white">
                <Typography variant="h3" className="text-lg sm:text-xl font-semibold mb-2 text-white">
                  {exp.company}
                </Typography>
                <p className="text-sm sm:text-base text-gray-700 dark:text-white/70 mb-2 leading-relaxed">{exp.position}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 mb-3 sm:mb-4">{exp.date}</p>
                {exp.responsibilities.length > 0 && (
                  <ul className="space-y-2 sm:space-y-3">
                    {exp.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex items-start text-gray-700 dark:text-white/80">
                        <span className="mt-2 w-1.5 h-1.5 bg-gray-700 dark:bg-white/80 rounded-full mr-2 flex-shrink-0"></span>
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