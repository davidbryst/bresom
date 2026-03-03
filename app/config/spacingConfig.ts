/**
 * Système d'espacement cohérent pour tout le portfolio
 * Utilisé pour harmoniser padding, margin, et positionnement
 */

export const SPACING = {
  // Espacement vertical des sections principales
  section: {
    py: "py-12 sm:py-16",        // Réduit (était py-20 ou py-24)
    pyLarge: "py-16 sm:py-20",   // Pour sections importantes
    pySmall: "py-8 sm:py-12",    // Pour sous-sections
  },

  // Espacement interne des containers
  container: {
    px: "px-6 sm:px-8 lg:px-12",
    maxWidth: "max-w-7xl 2xl:max-w-[1400px]",
  },

  // Espacement entre éléments
  gap: {
    xs: "gap-2 sm:gap-3",
    sm: "gap-3 sm:gap-4",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8",
    xl: "gap-8 sm:gap-12",
  },

  // Margins entre sections
  margin: {
    sectionTop: "mt-8 sm:mt-12",
    sectionBottom: "mb-8 sm:mb-12",
    elementTop: "mt-4 sm:mt-6",
    elementBottom: "mb-4 sm:mb-6",
  },

  // CTA spacing (optimisé)
  cta: {
    py: "py-8 sm:py-12",         // Réduit de py-16
    mt: "mt-8 sm:mt-12",         // Margin top
  },

  // Card spacing
  card: {
    p: "p-4 sm:p-6",
    gap: "gap-3 sm:gap-4",
  },
};

/**
 * Valeurs de translate pour animations (optimisées)
 */
export const TRANSLATE = {
  // Animations d'entrée (réduit pour plus de subtilité)
  enter: {
    sm: { y: 20, x: 20 },        // Petit mouvement
    md: { y: 30, x: 30 },        // Moyen (était 60)
    lg: { y: 40, x: 40 },        // Large (était 80)
  },

  // Hover effects (subtils)
  hover: {
    lift: { y: -6 },             // Card lift (était -8 ou -10)
    shift: { x: 4, y: -4 },      // Diagonal shift
  },

  // Parallax (réduit pour éviter trop de mouvement)
  parallax: {
    slow: 30,
    normal: 50,
    fast: 80,
  },
};

/**
 * Valeurs z-index cohérentes
 */
export const Z_INDEX = {
  background: 0,
  content: 10,
  dropdown: 20,
  overlay: 30,
  modal: 40,
  navbar: 50,
  tooltip: 60,
};
