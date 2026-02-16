import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        veil: {
          bg: "#050505",
          elevated: "#0a0a0c",
          surface: "#111115",
          card: "rgba(12, 12, 16, 0.6)",
          "card-hover": "rgba(18, 18, 24, 0.8)",
          border: "rgba(255, 255, 255, 0.06)",
          "border-hover": "rgba(255, 255, 255, 0.12)",
          green: "#10b981",
          "green-dim": "rgba(16, 185, 129, 0.12)",
          "green-glow": "rgba(16, 185, 129, 0.3)",
          violet: "#8b5cf6",
          "violet-dim": "rgba(139, 92, 246, 0.10)",
          "violet-glow": "rgba(139, 92, 246, 0.25)",
          text: "#f0f0f2",
          "text-secondary": "#8a8a96",
          "text-muted": "#55555f",
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        sans: ["DM Sans", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        veil: "16px",
        "veil-sm": "10px",
        "veil-xs": "6px",
      },
      backdropBlur: {
        veil: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
