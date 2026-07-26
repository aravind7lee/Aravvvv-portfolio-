/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        surface: "#0a0a0a",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        ash: "#888888",
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Replace with premium font later
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Bebas Neue"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [],
}
