import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

/**
 * ✅ Composant pour basculer entre mode clair et sombre
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-dark-card/60 border border-violet-primary/30 hover:border-violet-accent/60 hover:bg-dark-surface/80 transition-all duration-300 group"
      aria-label={`Basculer vers le mode ${theme === "light" ? "sombre" : "clair"}`}
      title={`Mode ${theme === "light" ? "sombre" : "clair"}`}
    >
      {/* Icône Sun (visible en mode sombre) */}
      <Sun
        className={`w-5 h-5 text-violet-accent transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90 absolute"
        }`}
      />

      {/* Icône Moon (visible en mode clair) */}
      <Moon
        className={`w-5 h-5 text-violet-accent transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90 absolute"
        }`}
      />

      {/* Effet de glow au hover */}
      <div className="absolute inset-0 rounded-xl bg-violet-accent/0 group-hover:bg-violet-accent/10 transition-colors duration-300" />
    </button>
  );
}
