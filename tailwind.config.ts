import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px", // Très petits écrans", // Full HD / grands écrans
        "3xl": "1920px", // Full HD / grands écrans
        "4xl": "2560px", // 2K / très grands écrans
      },
      colors: {
        violet: {
          primary: "#6D28D9",
          accent: "#7C3AED",
          light: "#8B5CF6",
          glow: "rgba(124, 58, 237, 0.4)",
        },
        dark: {
          deep: "#0B0B0F",
          surface: "#1A1A23",
          card: "#242433",
          border: "#2D2D3D",
        },
        light: {
          primary: "#EDEDED",
          secondary: "#B8B8C0",
          muted: "#8B8B99",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Satoshi",
          "Poppins",
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
        "gradient-premium":
          "linear-gradient(135deg, #0B0B0F 0%, #1A1A23 50%, #0B0B0F 100%)",
        "gradient-violet": "linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)",
        "gradient-glow":
          "radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "text-reveal": "textReveal 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)",
          },
        },
        textReveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0, 0, 0, 1)",
      },
      boxShadow: {
        premium: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        "glow-violet": "0 0 30px rgba(124, 58, 237, 0.4)",
        "glow-violet-lg": "0 0 60px rgba(124, 58, 237, 0.3)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default withMT(config);
