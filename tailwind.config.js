/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#2B48D4",
        "weather-secondary": "#2B9DD4",
        "weather-tertiary": "#2BD4B7",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite'
      }
    },
    fontFamily: {
      "Open-Sans": ["Open Sans, sans-serif"]
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px"
    }
  },
  plugins: [],
}

