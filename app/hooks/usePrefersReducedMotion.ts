import { useEffect, useState } from "react";

/**
 * ✅ Hook pour détecter la préférence utilisateur "prefers-reduced-motion"
 * Respecte les besoins d'accessibilité des utilisateurs sensibles aux mouvements
 *
 * @returns true si l'utilisateur préfère des animations réduites, false sinon
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Vérifier si window est disponible (SSR safety)
    if (typeof window === "undefined") {
      return;
    }

    // Créer la media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Définir l'état initial
    setPrefersReducedMotion(mediaQuery.matches);

    // Écouter les changements
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Ajouter l'écouteur
    mediaQuery.addEventListener("change", handleChange);

    // Nettoyage
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * ✅ Utilitaire pour obtenir une durée d'animation respectueuse de l'accessibilité
 * @param normalDuration Durée normale de l'animation
 * @param reducedDuration Durée réduite (optionnel, par défaut 0)
 */
export function getAnimationDuration(
  normalDuration: number,
  reducedDuration: number = 0
): number {
  if (typeof window === "undefined") {
    return normalDuration;
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return prefersReduced ? reducedDuration : normalDuration;
}

/**
 * ✅ Utilitaire pour désactiver une animation si prefers-reduced-motion est activé
 * @param animation Configuration d'animation Framer Motion ou GSAP
 */
export function respectReducedMotion<T extends Record<string, any>>(
  animation: T
): T | Record<string, never> {
  if (typeof window === "undefined") {
    return animation;
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return prefersReduced ? {} : animation;
}
