import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#141414",
        border: "#2a2a2a",
        text: "#e8e5e0",
        "text-dim": "#8a8378",
        gold: "#c4a265",
        blue: "#3d5a80",
        terracotta: "#e07a5f",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      gridTemplateColumns: {
        layout: "repeat(12, 1fr)",
      },
      gap: {
        gutter: "1rem",
      },
      maxWidth: {
        grid: "1440px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2rem",
        },
        screens: {
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
