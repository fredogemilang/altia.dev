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
        ivory: {
          DEFAULT: "#FFF6E8",
          50: "#FFFDF9",
          100: "#FFF6E8",
          200: "#F7ECDC",
          300: "#EFE0CD",
          400: "#E4D1BC",
        },
        cream: {
          DEFAULT: "#F0E6D3",
          light: "#FBF6EE",
          dark: "#E3D5BE",
        },
        vermilion: {
          DEFAULT: "#E34234",
          hover: "#CC372A",
          dark: "#A82B20",
          light: "#FFEBE8",
          50: "#FFF5F4",
          100: "#FFE8E5",
          500: "#E34234",
          600: "#CC372A",
          700: "#B0291D",
        },
        terracotta: {
          DEFAULT: "#C46B4E",
          light: "#DF8D72",
          dark: "#9E4F36",
        },
        charcoal: {
          DEFAULT: "#2F2A26",
          50: "#F5F4F3",
          100: "#E6E4E2",
          300: "#A8A29D",
          400: "#7A7169",
          500: "#4A433E",
          800: "#2F2A26",
          900: "#1A1715",
        },
        warm: {
          gray: "#8A8078",
          border: "#E8DFD3",
          card: "#FAF4E9",
          hover: "#F3ECE0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        warm: "0 10px 30px -10px rgba(47, 42, 38, 0.08)",
        "warm-lg": "0 20px 40px -15px rgba(47, 42, 38, 0.12)",
        "vermilion-glow": "0 10px 30px -5px rgba(227, 66, 52, 0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
