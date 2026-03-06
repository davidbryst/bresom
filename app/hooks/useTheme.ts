import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * ✅ Hook pour gérer le thème clair/sombre
 * Persiste le choix utilisateur dans localStorage
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR safety
    if (typeof window === "undefined") return "dark";

    // Lire depuis localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) return savedTheme;

    // Détecter la préférence système
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    // SSR safety
    if (typeof window === "undefined") return;

    // Appliquer le thème au document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Sauvegarder dans localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}
