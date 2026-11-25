import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f3f5f9",
          100: "#e4e8f0",
          200: "#c5cddd",
          300: "#98a5bf",
          400: "#68799b",
          500: "#4a5b7e",
          600: "#37456a",
          700: "#27345a",
          800: "#162447",
          900: "#0b1f44",
          950: "#06132b",
        },
        brand: {
          50: "#eaf3ff",
          100: "#d3e6ff",
          200: "#a9cdff",
          300: "#6faaf5",
          400: "#3a88ea",
          500: "#0770e3",
          600: "#0559b8",
          700: "#06468f",
        },
        success: { 50: "#e9f8f0", 500: "#14a05a", 700: "#0d7342" },
        warn: { 50: "#fff6e5", 500: "#e08a00", 700: "#9a5d00" },
        danger: { 50: "#feeceb", 500: "#d6362c", 700: "#a3231b" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,68,0.06), 0 4px 16px rgba(11,31,68,0.06)",
        pop: "0 8px 30px rgba(11,31,68,0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
