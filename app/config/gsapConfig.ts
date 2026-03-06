import gsap from "gsap";

/**
 * Configuration globale des paramètres GSAP
 */

export const GSAP_CONFIG = {
  // Durées d'animation par défaut
  durations: {
    instant: 0.2,
    fast: 0.4,
    normal: 0.6,
    slow: 0.9,
    verySlow: 1.2,
    dramatic: 1.5,
  },

  // Délais d'animation
  delays: {
    none: 0,
    tiny: 0.05,
    small: 0.1,
    medium: 0.2,
    large: 0.3,
    huge: 0.5,
  },

  // Stagger entre les enfants
  stagger: {
    tiny: 0.03,
    small: 0.05,
    normal: 0.08,
    medium: 0.12,
    large: 0.15,
    dramatic: 0.2,
  },

  // Points de déclenchement au scroll
  scrollTrigger: {
    start: "top 75%",
    startEarly: "top 85%",
    startLate: "top 60%",
    startVeryEarly: "top 95%",
    end: "bottom 20%",
    endLate: "bottom 10%",
  },

  // Distances de révélation
  distances: {
    tiny: 10,
    small: 20,
    normal: 40,
    medium: 60,
    large: 100,
    huge: 150,
  },

  // Easing functions courantes
  eases: {
    // Smooth easings
    smooth: "power2.out",
    smoothInOut: "power2.inOut",
    smooth3: "power3.out",
    smooth3InOut: "power3.inOut",
    smooth4: "power4.out",

    // Bouncy easings
    bounce: "back.out(1.7)",
    bounceStrong: "back.out(2.5)",
    bounceGentle: "back.out(1.2)",
    bounceInOut: "back.inOut(1.7)",

    // Elastic easings
    elastic: "elastic.out(1, 0.5)",
    elasticStrong: "elastic.out(1, 0.3)",
    elasticGentle: "elastic.out(1, 0.7)",

    // Exponential easings
    expo: "expo.out",
    expoInOut: "expo.inOut",
    expoIn: "expo.in",

    // Circular easings
    circ: "circ.out",
    circInOut: "circ.inOut",

    // Premium easings
    spring: "power4.out",
    premium: "power3.out",
    gentle: "sine.out",
    sine: "sine.inOut",
  },

  // Vitesses parallax
  parallax: {
    subtle: -0.2,
    slow: -0.3,
    normal: -0.5,
    fast: -0.7,
    veryFast: -1,
    dramatic: -1.5,
  },

  // Master rhythm system (breathing effect duration in seconds)
  masterRhythm: {
    breathDuration: 6,
    pulseDuration: 3,
    waveDuration: 8,
  },

  // 3D Transform presets
  transform3D: {
    perspective: 1000,
    light: { rotateX: 5, rotateY: 5 },
    medium: { rotateX: 10, rotateY: 10 },
    strong: { rotateX: 20, rotateY: 20 },
    dramatic: { rotateX: 30, rotateY: 30 },
  },

  // Animation sequences presets
  sequences: {
    // Page entrance sequence
    pageEnter: {
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
    },
    // Card reveal sequence
    cardReveal: {
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.7)",
    },
    // Hero entrance sequence
    heroEnter: {
      duration: 1.5,
      stagger: 0.15,
      ease: "power4.out",
    },
    // Quick interaction
    interaction: {
      duration: 0.3,
      ease: "power2.out",
    },
    // Celebration sequence
    celebration: {
      duration: 0.6,
      ease: "back.out(2.5)",
    },
  },

  // Magnetic effect presets
  magnetic: {
    subtle: { strength: 0.3, duration: 0.4, ease: "power2.out" },
    normal: { strength: 0.6, duration: 0.3, ease: "power2.out" },
    strong: { strength: 0.9, duration: 0.25, ease: "power3.out" },
    extreme: { strength: 1.2, duration: 0.2, ease: "power3.out" },
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
 * Créer une animation de master rhythm (breathing effect)
 * Retourne une timeline qui respire infiniment
 */
export function createMasterRhythm(
  elements: gsap.TweenTarget,
  options?: {
    duration?: number;
    scale?: number;
    opacity?: number;
    ease?: string;
  }
) {
  const duration = options?.duration || GSAP_CONFIG.masterRhythm.breathDuration;
  const scale = options?.scale || 1.05;
  const opacity = options?.opacity || 0.9;
  const ease = options?.ease || "sine.inOut";

  return gsap.timeline({ repeat: -1, yoyo: true }).to(elements, {
    scale,
    opacity,
    duration,
    ease,
  });
}

/**
 * Créer une animation premium avec effets 3D
 */
export function createPremiumAnimation(
  element: gsap.TweenTarget,
  preset: "light" | "medium" | "strong" | "dramatic" = "medium"
) {
  const transform = GSAP_CONFIG.transform3D[preset];

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.9,
      rotateX: transform.rotateX,
      rotateY: transform.rotateY,
    },
    {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: GSAP_CONFIG.durations.slow,
      ease: GSAP_CONFIG.eases.smooth4,
      transformPerspective: GSAP_CONFIG.transform3D.perspective,
    }
  );
}

/**
 * Créer une séquence d'animation
 */
export function createSequence(
  preset: keyof typeof GSAP_CONFIG.sequences
) {
  return GSAP_CONFIG.sequences[preset];
}

/**
 * Créer une animation magnétique
 */
export function createMagneticConfig(
  preset: keyof typeof GSAP_CONFIG.magnetic
) {
  return GSAP_CONFIG.magnetic[preset];
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

/**
 * Créer une animation de clip-path reveal premium
 */
export function createClipReveal(
  element: gsap.TweenTarget,
  direction: "left" | "right" | "top" | "bottom" | "center" = "center",
  options?: {
    duration?: number;
    ease?: string;
    delay?: number;
  }
) {
  const clipPaths = {
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
    top: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    bottom: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    center: { from: "inset(50% 50% 50% 50%)", to: "inset(0% 0% 0% 0%)" },
  };

  return gsap.fromTo(
    element,
    { clipPath: clipPaths[direction].from },
    {
      clipPath: clipPaths[direction].to,
      duration: options?.duration || GSAP_CONFIG.durations.slow,
      ease: options?.ease || GSAP_CONFIG.eases.expo,
      delay: options?.delay || 0,
    }
  );
}

/**
 * ✅ Vérifier si l'utilisateur préfère des animations réduites
 * Respecte les besoins d'accessibilité
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * ✅ Obtenir une durée d'animation respectueuse de l'accessibilité
 * @param normalDuration Durée normale en secondes
 * @param reducedDuration Durée réduite en secondes (défaut: 0.1s pour une transition instantanée)
 */
export function getAccessibleDuration(
  normalDuration: number,
  reducedDuration: number = 0.1
): number {
  return prefersReducedMotion() ? reducedDuration : normalDuration;
}

/**
 * ✅ Wrapper pour créer des animations GSAP respectueuses de l'accessibilité
 * Si prefers-reduced-motion est activé, retourne une animation instantanée
 */
export function createAccessibleAnimation(
  vars: gsap.TweenVars,
  reducedVars?: Partial<gsap.TweenVars>
): gsap.TweenVars {
  if (prefersReducedMotion()) {
    // Animation réduite: durée très courte, pas d'effets complexes
    return {
      ...vars,
      duration: 0.1,
      ease: "none",
      // Garder seulement les propriétés de position finale
      scale: vars.scale !== undefined ? vars.scale : undefined,
      opacity: vars.opacity !== undefined ? vars.opacity : undefined,
      x: vars.x !== undefined ? vars.x : undefined,
      y: vars.y !== undefined ? vars.y : undefined,
      // Supprimer les effets de rotation, parallax, etc.
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      ...reducedVars,
    };
  }
  return vars;
}
