import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      colors: {
        gray: {
        50: "hsl(var(--g-50) / <alpha-value>)",
        100: "hsl(var(--g-100) / <alpha-value>)",
        200: "hsl(var(--g-200) / <alpha-value>)",
        300: "hsl(var(--g-300) / <alpha-value>)",
        400: "hsl(var(--g-400) / <alpha-value>)",
        500: "hsl(var(--g-500) / <alpha-value>)",
        600: "hsl(var(--g-600) / <alpha-value>)",
        700: "hsl(var(--g-700) / <alpha-value>)",
        800: "hsl(var(--g-800) / <alpha-value>)",
        900: "hsl(var(--g-900) / <alpha-value>)",
        950: "hsl(var(--g-950) / <alpha-value>)",
        },
        blue: {
          50: "hsl(var(--foreground) / <alpha-value>)",
          100: "hsl(var(--foreground) / <alpha-value>)",
          200: "hsl(var(--signal) / <alpha-value>)",
          300: "hsl(var(--signal) / <alpha-value>)",
          400: "hsl(var(--signal) / <alpha-value>)",
          500: "hsl(245 60% 52% / <alpha-value>)",
          600: "hsl(245 60% 46% / <alpha-value>)",
          700: "hsl(245 60% 38% / <alpha-value>)",
          800: "hsl(245 55% 28% / <alpha-value>)",
          900: "hsl(245 55% 20% / <alpha-value>)",
        },
        purple: {
          100: "hsl(var(--foreground) / <alpha-value>)",
          200: "hsl(var(--neuron) / <alpha-value>)",
          300: "hsl(var(--neuron) / <alpha-value>)",
          400: "hsl(var(--neuron) / <alpha-value>)",
          500: "hsl(var(--primary) / <alpha-value>)",
          600: "hsl(var(--primary) / <alpha-value>)",
          700: "hsl(277 100% 36% / <alpha-value>)",
          800: "hsl(277 90% 28% / <alpha-value>)",
          900: "hsl(277 80% 20% / <alpha-value>)",
        },
        yellow: {
          200: "hsl(186 100% 85% / <alpha-value>)",
          300: "hsl(var(--signal) / <alpha-value>)",
          400: "hsl(var(--signal) / <alpha-value>)",
          500: "hsl(var(--signal) / <alpha-value>)",
          600: "hsl(190 100% 30% / <alpha-value>)",
          700: "hsl(190 100% 24% / <alpha-value>)",
          800: "hsl(190 90% 18% / <alpha-value>)",
          900: "hsl(190 80% 14% / <alpha-value>)",
        },
        neuron: "hsl(var(--neuron))",
        signal: "hsl(var(--signal))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
