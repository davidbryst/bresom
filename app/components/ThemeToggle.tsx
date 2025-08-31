import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function getPreferredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  // Défaut: clair
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      aria-label="Basculer thème"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition-colors text-white shadow-lg"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}


