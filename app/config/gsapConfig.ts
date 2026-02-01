import gsap from "gsap";

/**
 * Configuration globale des paramètres GSAP
 */

export const GSAP_CONFIG = {
  // Durées d'animation par défaut
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    verySlow: 1.5,
  },

  // Délais d'animation
  delays: {
    none: 0,
    small: 0.1,
    medium: 0.2,
    large: 0.3,
  },

  // Stagger entre les enfants
  stagger: {
    small: 0.05,
    normal: 0.1,
    medium: 0.15,
    large: 0.2,
  },

  // Points de déclenchement au scroll
  scrollTrigger: {
    start: "top 75%",
    startEarly: "top 85%",
    startLate: "top 60%",
    end: "bottom 20%",
  },

  // Distances de révélation
  distances: {
    small: 20,
    normal: 50,
    medium: 100,
    large: 150,
  },

  // Easing functions courantes
  eases: {
    smooth: "power2.out",
    smoothInOut: "power2.inOut",
    smooth3: "power3.out",
    smooth3InOut: "power3.inOut",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.5)",
    expo: "expo.out",
    expoInOut: "expo.inOut",
    circ: "circ.out",
    spring: "power4.out",
  },

  // Vitesses parallax
  parallax: {
    slow: -0.3,
    normal: -0.5,
    fast: -0.7,
    veryFast: -1,
  },
};

/**
 * Initialiser les configurations GSAP globales
 */
export function initializeGSAP() {
  // Définir les defaults GSAP
  gsap.defaults({
    ease: GSAP_CONFIG.eases.smooth,
    duration: GSAP_CONFIG.durations.normal,
  });

  // Activer les métadonnées en développement
  if (process.env.NODE_ENV === "development") {
    gsap.set(".gsap-debug", {
      fontSize: 12,
      background: "#000",
      color: "#0f0",
    });
  }
}

/**
 * Détruire les animations GSAP
 */
export function cleanupGSAP() {
  gsap.globalTimeline.clear();
}

/**
 * Réinitialiser les animations GSAP
 */
export function resetGSAPAnimations() {
  gsap.killTweensOf("*");
  cleanupGSAP();
}

/**
 * Obtenir les configs de parallax
 */
export function getParallaxConfig(preset: keyof typeof GSAP_CONFIG.parallax) {
  return GSAP_CONFIG.parallax[preset];
}

/**
 * Obtenir les configs de stagger
 */
export function getStaggerConfig(preset: keyof typeof GSAP_CONFIG.stagger) {
  return GSAP_CONFIG.stagger[preset];
}

/**
 * Obtenir les configs de durée
 */
export function getDurationConfig(preset: keyof typeof GSAP_CONFIG.durations) {
  return GSAP_CONFIG.durations[preset];
}

/**
 * Obtenir les configs de easing
 */
export function getEaseConfig(preset: keyof typeof GSAP_CONFIG.eases) {
  return GSAP_CONFIG.eases[preset];
}
