import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#f5f1e8",
        bone2: "#efe8da",
        ink: "#0a0a0a",
        ink2: "#111111",
        steel: "#151515",
        steel2: "#202020",
        heat: "#ff6b4a",
        amber: "#f3b13f",
        rose: "#ff4d6d"
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        cover: "0 28px 70px rgba(0, 0, 0, 0.26)",
        spine: "-14px 0 30px rgba(0, 0, 0, 0.34)"
      }
    }
  },
  plugins: []
};

export default config;
