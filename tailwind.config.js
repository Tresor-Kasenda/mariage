/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#9333ea',
        secondary: '#f472b6',
        accent: '#fbbf24',
        neutral: '#fef3c7'
      }
    },
  },
  plugins: [],
}

