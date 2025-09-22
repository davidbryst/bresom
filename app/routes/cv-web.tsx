import React from "react";
import { aboutData, contactData, experiencesData, heroData, projectsData, skillsData } from "../data/cvContent";

export default function CVWeb() {
  // Extract skills from skillsData with proper typing
  const extractedSkills = skillsData
    .flatMap(group => group.buckets.flatMap(bucket => bucket.items))
    .slice(0, 6)
    .map(skill => ({
      name: skill.name,
      level: skill.level
    }));

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gray-100 px-8 py-6 flex items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold">
              <span className="text-gray-800">Salut.</span>
              <span className="ml-2 text-2xl block text-gray-500 font-medium">Je suis</span>
              <span className="block text-4xl text-orange-500">{heroData.name}</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">{heroData.primaryLines.join(" • ")}</p>
          </div>
          <div className="w-36 h-36 rounded-lg overflow-hidden border-4 border-gray-200">
            <img
              src="/profile.jpg"
              alt="David Abraham Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/260x260.png?text=DA";
              }}
            />
          </div>
        </header>

        {/* About + Contact strip */}
        <section className="px-8 py-6">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-8">
              <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">À PROPOS</div>
                  <div className="flex-1 h-0.5 bg-orange-300" />
                </div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {aboutData.description}
                </p>
                <div className="mt-4 space-y-2">
                  {aboutData.points.map((point, index) => (
                    <p key={index} className="text-sm text-gray-600 leading-relaxed">
                      • {point}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <span><strong>Expérience:</strong> {aboutData.experience}</span>
                  <span><strong>Stack:</strong> {aboutData.stack}</span>
                  <span><strong>Valeurs:</strong> {aboutData.values}</span>
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <div className="flex flex-col gap-3">
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-orange-600 font-semibold">CONTACT</div>
                  <div className="mt-3 text-sm text-gray-600 flex flex-col gap-2">
                    <div>📞 {contactData.phone}</div>
                    <div>📧 {contactData.email}</div>
                    <div>📍 {contactData.location}</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="text-sm font-semibold">PROJETS RÉCENTS</div>
                  <div className="mt-2 space-y-1">
                    {projectsData.slice(0, 2).map((project, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        <strong>{project.title}</strong> — {project.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content - 3 columns style */}
        <main className="px-8 pb-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left column - Work Experience & Projects */}
            <aside className="col-span-7">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg font-semibold">EXPÉRIENCE PROFESSIONNELLE</div>
                  <div className="flex-1 h-0.5 bg-orange-300" />
                </div>

                <div className="mt-4 space-y-6">
                  {experiencesData.map((exp, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-sm" />
                      <h4 className="font-bold text-sm text-gray-800">
                        {exp.position} <span className="text-xs text-gray-400">{exp.date}</span>
                      </h4>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{exp.company}</div>
                      <div className="mt-2 space-y-1">
                        {exp.responsibilities.slice(0, 2).map((resp, idx) => (
                          <p key={idx} className="text-sm text-gray-600">• {resp}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg font-semibold">PROJETS</div>
                  <div className="flex-1 h-0.5 bg-orange-300" />
                </div>
                <div className="mt-4 space-y-6">
                  {projectsData.map((project, i) => (
                    <div key={i} className="pl-6 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-sm" />
                      <h4 className="font-bold text-sm">
                        {project.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right column - Education, Skills, Languages */}
            <section className="col-span-5">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg font-semibold">COMPÉTENCES TECHNIQUES</div>
                  <div className="flex-1 h-0.5 bg-orange-300" />
                </div>

                <div className="mt-4 space-y-4">
                  {extractedSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">{skill.name}</div>
                        <div className="text-xs text-gray-400">{skill.level}%</div>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${skill.level}%`, 
                            background: "linear-gradient(90deg,#ff7a00,#ff4d00)" 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg font-semibold">DOMAINES D'EXPERTISE</div>
                  <div className="flex-1 h-0.5 bg-orange-300" />
                </div>

                <div className="mt-4 space-y-4 text-sm text-gray-600">
                  {skillsData.map((domain, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-sm text-gray-800">{domain.category}</h4>
                      <p className="mt-1 text-xs">{domain.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg font-semibold">INFORMATIONS</div>
                  <div className="flex-1 h-0.5 bg-orange-300" />
                </div>

                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div>
                    <h4 className="font-bold text-sm">Langues</h4>
                    <p className="text-xs">Français (natif), Anglais (professionnel)</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm">Disponibilité</h4>
                    <p className="text-xs">Disponible pour missions freelance et CDI</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm">Localisation</h4>
                    <p className="text-xs">Côte d'Ivoire, travail à distance possible</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer with links */}
        <footer className="px-8 py-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              CV Web • Version {new Date().getFullYear()}
            </div>
            <div className="flex gap-4">
              <a 
                href="/cv.pdf" 
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Version PDF
              </a>
              <a 
                href="/" 
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                🌐 Portfolio complet
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}