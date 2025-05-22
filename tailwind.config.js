/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#92400e',   // Ambre foncé
        secondary: '#b45309', // Ambre moyen-foncé
        accent: '#f59e0b',    // Ambre clair
        neutral: '#fef3c7'    // Ambre très clair (fond)
      }
    },
  },
  plugins: [],
}

