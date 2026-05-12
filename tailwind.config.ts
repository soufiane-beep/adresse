import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2C1A0E",
        "ink-dark": "#1A0A05",
        parchment: "#F2E8D4",
        paper: "#E8D8BC",
        surface: "#2C1A0E",
        "surface-2": "#3D2812",
        ember: "#B87230",
        "ember-light": "#CF9050",
        blush: "#C87571",
        cream: "#F5ECD8",
        "cream-dim": "#C4AA88",
        stone: "#9A8268",
        rim: "#3A2818",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.9s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  safelist: [
    "col-span-1", "col-span-2",
    "row-span-1", "row-span-2",
  ],
  plugins: [],
};
export default config;
