import { Typography } from "@material-tailwind/react";

const skills = {
  "Développement Web": [
    "React/Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "REST APIs"
  ],
  "Design": [
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Responsive Design"
  ],
  "Mobile": [
    "React Native",
    "Flutter",
    "iOS Development",
    "Android Development",
    "Cross-platform"
  ]
};

export default function Skills() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Mes Compétences
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div 
              key={category} 
              className="group relative overflow-hidden rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5">
                <Typography variant="h3" className="text-xl font-semibold mb-4 text-white">
                  {category}
                </Typography>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="flex items-center text-white/80">
                      <span className="w-1.5 h-1.5 bg-white/80 rounded-full mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 