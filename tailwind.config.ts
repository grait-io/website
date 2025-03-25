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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Cyberpunk color palette
        cyber: {
          black: "#0a0a0a",
          darkgray: "#1a1a1a",
          gray: "#2a2a2a",
          blue: "#00f0ff",
          purple: "#d300c5",
          pink: "#ff00a0",
          yellow: "#ffff00",
          green: "#00ff9f",
          red: "#ff0055",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to right, #00f0ff, #d300c5)',
        'cyber-radial': 'radial-gradient(circle, #00f0ff, #d300c5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
          '100%': { textShadow: '0 0 10px #d300c5, 0 0 20px #d300c5' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
