import { useRef } from "react";
import {
  AnimatedSection,
  StaggerContainer,
} from "~/components/AnimatedSection";
import {
  ScrollReveal,
  Parallax,
  NumberCounter,
} from "~/components/ScrollEffects";
import {
  useHoverAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimations";

/**
 * Composant de démonstration pour les animations GSAP
 * Montre différents types d'animations disponibles
 */
export function AnimationsDemo() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Ajouter le hover effect à tous les cards
  cardRefs.current.forEach((ref) => {
    if (ref) {
      useHoverAnimation(ref as any, { scale: 1.08, y: -8, duration: 0.3 });
    }
  });

  return (
    <div className="space-y-24 py-24">
      {/* Section 1: Parallax Hero */}
      <section className="relative overflow-hidden py-32">
        <Parallax speed={-0.4} className="relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-blur-in">
              Animations GSAP
            </h1>
            <p className="text-xl text-gray-400 animate-slide-up">
              Expérience fluide et moderne au scroll
            </p>
          </div>
        </Parallax>
      </section>

      {/* Section 2: Cascade Animation */}
      <AnimatedSection animationType="cascade" staggerChildren={true}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Animation en Cascade</h2>
          <p className="text-gray-400">
            Les éléments apparaissent un par un avec un délai
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i - 1] = el;
              }}
              className="p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-600/20 hover:border-purple-600/50 transition-colors cursor-pointer will-animate"
            >
              <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
              <p className="text-gray-400">
                Contenu animé avec délai de stagger
              </p>
            </div>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* Section 3: Scroll Reveal */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Révélations au Scroll</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="left" distance={80} duration={0.8}>
            <div className="p-8 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-2xl font-bold mb-4">De la gauche</h3>
              <p className="text-gray-400">
                Cet élément apparaît de la gauche au scroll
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={80} duration={0.8}>
            <div className="p-8 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-2xl font-bold mb-4">De la droite</h3>
              <p className="text-gray-400">
                Cet élément apparaît de la droite au scroll
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={80} duration={0.8}>
            <div className="p-8 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-2xl font-bold mb-4">De bas en haut</h3>
              <p className="text-gray-400">
                Cet élément apparaît du bas vers le haut au scroll
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down" distance={80} duration={0.8}>
            <div className="p-8 bg-dark-surface rounded-xl border border-dark-border">
              <h3 className="text-2xl font-bold mb-4">De haut en bas</h3>
              <p className="text-gray-400">
                Cet élément apparaît du haut vers le bas au scroll
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Compteurs Animés */}
      <AnimatedSection animationType="slideUp">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Statistiques Animées</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Projets", value: 50, suffix: "+" },
            { label: "Clients", value: 100, suffix: "+" },
            { label: "Années", value: 5, suffix: "" },
            { label: "Satisfactions", value: 99, suffix: "%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-lg"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                <NumberCounter
                  from={0}
                  to={stat.value}
                  duration={2.5}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Section 5: Parallax Effect */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Effet Parallax</h2>
        </div>

        <Parallax speed={-0.2}>
          <div className="h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center border border-purple-600/20">
            <p className="text-2xl font-semibold">
              Cet élément se déplace plus lentement que le scroll
            </p>
          </div>
        </Parallax>
      </section>

      {/* Section 6: Animations de classe CSS */}
      <AnimatedSection animationType="cascade" staggerChildren={true}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Animations CSS Utilitaires
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { class: "animate-float", label: "Float" },
            { class: "animate-pulse-glow", label: "Pulse" },
            { class: "animate-bounce-custom", label: "Bounce" },
            { class: "animate-scale-pulse", label: "Scale" },
            { class: "animate-rotate-slow", label: "Rotate" },
            { class: "animate-slide-up", label: "Slide Up" },
            { class: "animate-fade-in", label: "Fade In" },
            { class: "animate-zoom-in", label: "Zoom In" },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-4 bg-purple-600/10 rounded-lg border border-purple-600/20 flex flex-col items-center justify-center h-24 ${item.class}`}
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full mb-2"></div>
              <p className="text-xs text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Section 7: Hover Effects */}
      <AnimatedSection animationType="slideUp">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Hover Effects</h2>
          <p className="text-gray-400">
            Survolez les cartes pour voir l'animation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-600/20 cursor-pointer transition-colors hover:border-purple-600/50"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Card {i}</h3>
              <p className="text-gray-400">
                Hover effect avec scale et Y offset
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

export default AnimationsDemo;
