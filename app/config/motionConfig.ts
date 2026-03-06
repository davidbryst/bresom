/**
 * Framer Motion Configuration
 * Configuration centralisée pour Framer Motion qui correspond à l'esthétique GSAP
 * Utilisé pour maintenir la cohérence visuelle entre les deux systèmes d'animation
 */

import { Transition, Variant } from "motion/react";

/**
 * Transitions Spring - Matchent les easings GSAP elastic
 */
export const SPRING_TRANSITIONS = {
  /**
   * Spring par défaut - Équivalent à elastic.out(1, 0.5) en GSAP
   * Utilisation: Micro-interactions, hover states
   */
  default: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
  },

  /**
   * Spring doux - Équivalent à elastic.out(1, 0.7) en GSAP
   * Utilisation: Animations plus subtiles, transitions de layout
   */
  gentle: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
  },

  /**
   * Spring rebondissant - Équivalent à back.out(1.7) en GSAP
   * Utilisation: Card reveals, button success states
   */
  bouncy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 15,
  },

  /**
   * Spring rapide - Pour interactions instantanées
   * Utilisation: Click feedback, toggles
   */
  snappy: {
    type: "spring" as const,
    stiffness: 600,
    damping: 20,
  },
} as const satisfies Record<string, Transition>;

/**
 * Transitions Easing - Matchent les easings GSAP
 */
export const EASING_TRANSITIONS = {
  /**
   * Smooth - Équivalent à power2.out en GSAP
   * Utilisation: Fade-ins, simple movements
   */
  smooth: {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier similar to power2.out
    duration: 0.4,
  },

  /**
   * Smooth lent - Équivalent à power2.out avec duration longue
   * Utilisation: Page transitions, major state changes
   */
  smoothSlow: {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.6,
  },

  /**
   * Premium - Équivalent à power3.out en GSAP
   * Utilisation: Premium effects, featured elements
   */
  premium: {
    type: "tween" as const,
    ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier similar to power3.out
    duration: 0.5,
  },

  /**
   * Expo - Équivalent à expo.out en GSAP
   * Utilisation: Dramatic entrances, reveals
   */
  expo: {
    type: "tween" as const,
    ease: [0.19, 1, 0.22, 1], // cubic-bezier similar to expo.out
    duration: 0.8,
  },

  /**
   * Rapide - Pour interactions instantanées
   * Utilisation: Tooltips, small elements
   */
  fast: {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.2,
  },
} as const satisfies Record<string, Transition>;

/**
 * Variants réutilisables pour animations communes
 */
export const MOTION_VARIANTS = {
  /**
   * Fade in + slide up - Animation d'entrée standard
   */
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  } as Record<string, Variant>,

  /**
   * Fade in + slide down
   */
  fadeInDown: {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  } as Record<string, Variant>,

  /**
   * Scale in - Pour boutons, cards
   */
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  } as Record<string, Variant>,

  /**
   * Slide in from left
   */
  slideInLeft: {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  } as Record<string, Variant>,

  /**
   * Slide in from right
   */
  slideInRight: {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  } as Record<string, Variant>,

  /**
   * Rotation entrance - Pour icons, success indicators
   */
  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -180,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
  } as Record<string, Variant>,

  /**
   * Blur fade in - Premium entrance effect
   */
  blurFadeIn: {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  } as Record<string, Variant>,
} as const;

/**
 * Stagger settings - Cohérents avec GSAP_CONFIG.stagger
 */
export const STAGGER_CONFIG = {
  /**
   * Très petit stagger - Pour beaucoup d'éléments
   */
  tiny: 0.03,

  /**
   * Petit stagger - Pour lists moyennes
   */
  small: 0.05,

  /**
   * Stagger normal - Par défaut
   */
  normal: 0.08,

  /**
   * Stagger moyen - Pour dramatic effect
   */
  medium: 0.12,

  /**
   * Grand stagger - Pour strong emphasis
   */
  large: 0.15,

  /**
   * Stagger dramatique - Pour hero sequences
   */
  dramatic: 0.2,
} as const;

/**
 * Durées - Cohérentes avec GSAP_CONFIG.durations
 */
export const DURATIONS = {
  instant: 0.2,
  fast: 0.4,
  normal: 0.6,
  slow: 0.9,
  verySlow: 1.2,
  dramatic: 1.5,
} as const;

/**
 * Configuration globale Motion
 */
export const MOTION_CONFIG = {
  spring: SPRING_TRANSITIONS,
  easing: EASING_TRANSITIONS,
  variants: MOTION_VARIANTS,
  stagger: STAGGER_CONFIG,
  durations: DURATIONS,
} as const;

/**
 * Helper: Obtenir une transition spring par nom
 */
export function getSpringTransition(
  name: keyof typeof SPRING_TRANSITIONS = "default"
): Transition {
  return SPRING_TRANSITIONS[name];
}

/**
 * Helper: Obtenir une transition easing par nom
 */
export function getEasingTransition(
  name: keyof typeof EASING_TRANSITIONS = "smooth"
): Transition {
  return EASING_TRANSITIONS[name];
}

/**
 * Helper: Obtenir un variant par nom
 */
export function getVariant(
  name: keyof typeof MOTION_VARIANTS
): Record<string, Variant> {
  return MOTION_VARIANTS[name];
}

/**
 * Helper: Créer une configuration de stagger
 */
export function createStaggerConfig(
  staggerAmount: keyof typeof STAGGER_CONFIG = "normal",
  from: "start" | "end" | "center" = "start"
) {
  return {
    staggerChildren: STAGGER_CONFIG[staggerAmount],
    delayChildren: 0,
    staggerDirection: from === "end" ? -1 : 1,
  };
}

/**
 * Helper: Vérifier prefers-reduced-motion
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Helper: Créer transition avec support reduced-motion
 */
export function createAccessibleTransition(
  transition: Transition
): Transition {
  if (getPrefersReducedMotion()) {
    return { duration: 0 };
  }
  return transition;
}

/**
 * Preset: Animation de bouton hover/tap
 */
export const BUTTON_ANIMATION = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: SPRING_TRANSITIONS.default,
} as const;

/**
 * Preset: Animation de card hover
 */
export const CARD_ANIMATION = {
  whileHover: { y: -5, scale: 1.02 },
  transition: SPRING_TRANSITIONS.gentle,
} as const;

/**
 * Preset: Animation de link hover
 */
export const LINK_ANIMATION = {
  whileHover: { x: 5 },
  transition: SPRING_TRANSITIONS.snappy,
} as const;

/**
 * Preset: Configuration AnimatePresence pour modals
 */
export const MODAL_ANIMATION = {
  initial: { opacity: 0, scale: 0.9, y: 50 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 50 },
  transition: SPRING_TRANSITIONS.gentle,
} as const;

/**
 * Preset: Configuration AnimatePresence pour toasts
 */
export const TOAST_ANIMATION = {
  initial: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: 200, scale: 0.8 },
  transition: SPRING_TRANSITIONS.default,
} as const;

/**
 * Preset: Configuration AnimatePresence pour dropdowns
 */
export const DROPDOWN_ANIMATION = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: EASING_TRANSITIONS.fast,
} as const;

export default MOTION_CONFIG;
