/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'iransans': ['iransans', 'sans-serif'],
        'black': ['bold', 'sans-serif'],
        'vazir': ['bold', 'sans-serif'],
        'sahel': ['bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
  
}
