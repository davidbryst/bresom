import type { Config } from "tailwindcss";

// Lite ("Studio / Editorial") theme only. Colors mirror the CSS variables in
// app/styles/lite.css; `vermilion` reads the runtime accent (--accent-rgb) so
// the theme switcher can re-tint it.
const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0E0E",
        paper: "#F2EEE6",
        bone: "#E7E0D2",
        vermilion: "rgb(var(--accent-rgb) / <alpha-value>)",
        // Darker accent for small text (WCAG AA on paper), see lite.css.
        "accent-text": "var(--accent-text)",
        cobalt: "#2B44FF",
        forest: "#0E8A4F",
        rule: "rgba(14,14,14,0.12)",
      },
      fontFamily: {
        display: ['"Syne"', "ui-sans-serif", "sans-serif"],
        body: ['"Hanken Grotesk"', "ui-sans-serif", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        lite: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
