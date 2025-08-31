import type { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      backgroundImage: {
        "gradient-custom-light": "linear-gradient(135deg, #f8fafc, #8A5EF1FF, #f8fafc, #a855f7, #f8fafc, #F891C5FF, #f8fafc)",
        "gradient-custom-dark": "linear-gradient(135deg, #0a0a1b, #091841, #0a0a1b, #450572, #0a0a1b,  #480fa5, #0a0a1b, #5f0030, #0a0a1b)",
      },
    },
  },
  plugins: [mtConfig],
} satisfies Config;
