/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obs-primary': '#2b2e38',
        'obs-secondary': '#4f535e',
        'obs-control': '#3c404b',
      }
    },
  },
  plugins: [],
}

