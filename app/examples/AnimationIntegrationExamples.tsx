/**
 * EXEMPLES D'INTÉGRATION DANS LES COMPOSANTS EXISTANTS
 * 
 * Ce fichier montre comment intégrer les nouvelles animations GSAP
 * dans les composants actuels du site.
 */

// ============================================
// EXEMPLE 1: Intégrer AnimatedSection dans Hero
// ============================================

/*
import Hero from "~/components/Hero";
import { AnimatedSection } from "~/components/AnimatedSection";

export function ImprovedHero() {
  return (
    <AnimatedSection animationType="fadeIn">
      <Hero />
    </AnimatedSection>
  );
}
*/

// ============================================
// EXEMPLE 2: Animer les sections du site
// ============================================

/*
import { AnimatedSection, StaggerContainer } from "~/components/AnimatedSection";
import About from "~/components/About";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";

export default function Home() {
  return (
    <main>
      <AnimatedSection animationType="slideUp">
        <About />
      </AnimatedSection>

      <AnimatedSection animationType="cascade" staggerChildren={true}>
        <Skills />
      </AnimatedSection>

      <AnimatedSection animationType="parallax">
        <Projects />
      </AnimatedSection>
    </main>
  );
}
*/

// ============================================
// EXEMPLE 3: Ajouter du parallax aux images
// ============================================

/*
import { Parallax } from "~/components/ScrollEffects";

export function ImageGallery() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Parallax speed={-0.3}>
        <img src="image1.jpg" alt="Image 1" />
      </Parallax>
      
      <Parallax speed={-0.5}>
        <img src="image2.jpg" alt="Image 2" />
      </Parallax>
      
      <Parallax speed={-0.7}>
        <img src="image3.jpg" alt="Image 3" />
      </Parallax>
    </div>
  );
}
*/

// ============================================
// EXEMPLE 4: Animer les cards de projets
// ============================================

/*
import { ScrollReveal } from "~/components/ScrollEffects";
import { useHoverAnimation } from "~/hooks/useScrollAnimations";
import { useRef } from "react";

export function ProjectCard({ project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useHoverAnimation(cardRef, { scale: 1.05, y: -10 });

  return (
    <ScrollReveal direction="up" distance={50}>
      <div
        ref={cardRef}
        className="p-6 bg-dark-surface rounded-lg border border-dark-border"
      >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </ScrollReveal>
  );
}
*/

// ============================================
// EXEMPLE 5: Texte animé avec reveal
// ============================================

/*
import { SplitText } from "~/components/ScrollEffects";

export function AnimatedHeading() {
  return (
    <div>
      <SplitText
        text="Développeur Full Stack & Designer"
        tagName="h1"
        staggerDelay={0.05}
      />
    </div>
  );
}
*/

// ============================================
// EXEMPLE 6: Compteurs avec ScrollReveal
// ============================================

/*
import { NumberCounter } from "~/components/ScrollEffects";
import { ScrollReveal } from "~/components/ScrollEffects";

export function Statistics() {
  return (
    <ScrollReveal>
      <div className="grid grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold">
            <NumberCounter from={0} to={150} duration={2} suffix="+" />
          </div>
          <p>Projets</p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold">
            <NumberCounter from={0} to={500} duration={2} suffix="+" />
          </div>
          <p>Clients</p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold">
            <NumberCounter from={0} to={99} duration={2} suffix="%" />
          </div>
          <p>Satisfaction</p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold">
            <NumberCounter from={0} to={5} duration={2} suffix="" />
          </div>
          <p>Années</p>
        </div>
      </div>
    </ScrollReveal>
  );
}
*/

// ============================================
// EXEMPLE 7: Utiliser StaggerContainer pour listes
// ============================================

/*
import { StaggerContainer } from "~/components/AnimatedSection";

export function SkillsList() {
  const skills = ["React", "Node.js", "TypeScript", "Tailwind CSS"];

  return (
    <StaggerContainer className="space-y-3">
      {skills.map((skill) => (
        <div
          key={skill}
          className="p-3 bg-purple-600/10 rounded border border-purple-600/20"
        >
          {skill}
        </div>
      ))}
    </StaggerContainer>
  );
}
*/

// ============================================
// EXEMPLE 8: Barre de progression et scroll
// ============================================

// COMMENTED OUT - EXAMPLE ONLY
// import { ScrollProgressBar } from "~/components/ScrollAdvanced";
//
// export function Layout() {
//   return (
//     <>
//       <ScrollProgressBar
//         height={3}
//         color="linear-gradient(90deg, #7C3AED, #EC4899)"
//       />
//       {/* Page content */}
//     </>
//   );
// }

// ============================================
// EXEMPLE 9: Utiliser les hooks ensemble
// ============================================

/*
import { useRef } from "react";
import { useScrollReveal } from "~/hooks/useScrollAnimations";
import { useHoverAnimation } from "~/hooks/useScrollAnimations";

export function EnhancedCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Combine scroll reveal + hover animation
  useScrollReveal(cardRef, { direction: "left", distance: 100 });
  useHoverAnimation(cardRef, { scale: 1.1, y: -15 });

  return (
    <div
      ref={cardRef}
      className="p-8 bg-dark-surface rounded-xl border border-dark-border cursor-pointer"
    >
      <h3>Interactive Card</h3>
      <p>Scroll et hover pour voir les animations</p>
    </div>
  );
}
*/

// ============================================
// EXEMPLE 10: Galerie avec animations avancées
// ============================================

/*
import { useRef } from "react";
import { AnimatedSection, StaggerContainer } from "~/components/AnimatedSection";
import { ScrollReveal } from "~/components/ScrollEffects";
import { useHoverAnimation } from "~/hooks/useScrollAnimations";

export function Gallery() {
  const items = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <AnimatedSection animationType="cascade">
      <h2 className="text-4xl font-bold mb-12">Galerie</h2>
      
      <StaggerContainer className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <GalleryItem key={item} number={item} />
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}

function GalleryItem({ number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  useHoverAnimation(itemRef, { scale: 1.05, y: -10 });

  return (
    <ScrollReveal direction="up">
      <div
        ref={itemRef}
        className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-3xl font-bold cursor-pointer"
      >
        {number}
      </div>
    </ScrollReveal>
  );
}
*/

// ============================================
// EXEMPLE 11: Section avec pins
// ============================================

/*
import { PinSection } from "~/components/ScrollEffects";

export function PinnedSection() {
  return (
    <PinSection duration={3}>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600">
        <h2 className="text-5xl font-bold text-white">
          Cette section reste fixée au scroll
        </h2>
      </div>
    </PinSection>
  );
}
*/

// ============================================
// EXEMPLE 12: Utiliser les patterns d'animation
// ============================================

/*
import { useRef, useEffect } from "react";
import {
  createClipPathReveal,
  createZoomBlurReveal,
  createSplitTextReveal,
} from "~/utils/animationPatterns";

export function PatternExamples() {
  const clipRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clipRef.current) createClipPathReveal(clipRef.current, "ltr");
    if (zoomRef.current) createZoomBlurReveal(zoomRef.current);
    if (textRef.current) createSplitTextReveal(textRef.current, "word");
  }, []);

  return (
    <div className="space-y-12">
      <div ref={clipRef}>Clip Path Reveal</div>
      <div ref={zoomRef}>Zoom Blur Reveal</div>
      <div ref={textRef}>Split Text Reveal avec animation</div>
    </div>
  );
}
*/

// ============================================
// EXEMPLE 13: Classes CSS utilitaires
// ============================================

// COMMENTED OUT - EXAMPLE ONLY
// export function CSSAnimationExamples() {
//   return (
//     <div className="space-y-6">
//       {/* Animations simples */}
//       <div className="animate-slide-up">Slide Up</div>
//       <div className="animate-fade-in animate-delay-100">Fade In avec délai</div>
//       <div className="animate-zoom-in animate-delay-200">Zoom In avec délai</div>
//
//       {/* Animations continues */}
//       <div className="animate-float">Float animation</div>
//       <div className="animate-pulse-glow">Pulse Glow</div>
//       <div className="animate-rotate-slow">Rotate Slow</div>
//
//       {/* Gradient animé */}
//       <div className="animate-gradient bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white">
//         Gradient animé
//       </div>
//
//       {/* Avec stagger */}
//       <div className="grid grid-cols-3 gap-4">
//       <div className="animate-slide-up animate-delay-100">Item 1</div>
//       <div className="animate-slide-up animate-delay-200">Item 2</div>
//       <div className="animate-slide-up animate-delay-300">Item 3</div>
//     </div>
//   </div>
// );
// }

export default function AnimationIntegrationExamples() {
  return (
    <div className="p-8 bg-dark-surface rounded-lg border border-dark-border">
      <h2 className="text-2xl font-bold mb-4">Exemples d'intégration</h2>
      <p className="text-gray-400">
        Consultez les commentaires dans ce fichier pour voir comment intégrer
        les nouvelles animations GSAP dans vos composants existants.
      </p>
      <p className="text-gray-400 mt-4">
        Décommentez les exemples pour les utiliser!
      </p>
    </div>
  );
}
