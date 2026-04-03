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
        "dark-bg":      "#0D0D0D",
        "section-bg":   "#141414",
        "card-bg":      "#1A1A1A",
        "hover-bg":     "#222222",
        "text-primary": "#F5F5F5",
        "text-muted":   "#999999",
        "gold":         "#D4A853",
        "terracotta":   "#C17F4A",
        "dark-bar":     "#0A0A0A",
        "border-dark":  "#2A2A2A",
      },
      fontFamily: {
        cinzel:     ["var(--font-cinzel)", "serif"],
        raleway:    ["var(--font-raleway)", "sans-serif"],
        devanagari: ["var(--font-noto-devanagari)", "serif"],
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cta-gradient":     "linear-gradient(96deg, #C17F4A 0%, #D4A853 100%)",
        "gold-shimmer":     "linear-gradient(105deg, transparent 40%, rgba(212,168,83,0.25) 50%, transparent 60%)",
      },
      animation: {
        "fade-in":   "fadeIn 0.4s ease-out forwards",
        "slide-up":  "slideUp 0.4s ease-out forwards",
        "glow-pulse":"glowPulse 3s ease-in-out infinite",
        shimmer:     "shimmer 2.5s linear infinite",
        float:       "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,168,83,0.2)" },
          "50%":      { boxShadow: "0 0 40px rgba(212,168,83,0.5), 0 0 80px rgba(193,127,74,0.2)" },
        },
        shimmer: { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        float:   { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      boxShadow: {
        gold:       "0 0 30px rgba(212,168,83,0.3)",
        "gold-lg":  "0 0 60px rgba(212,168,83,0.4)",
        terracotta: "0 0 30px rgba(193,127,74,0.25)",
        card:       "0 2px 20px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
