/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-100': '#BD335C',
        'main-200': '#6D142F',
        'overlay-30': 'rgba(0,0,0,0.3)'
      },
      colors: {
        'main-100': '#BD335C',
        'main-200': '#6D142F'
      },
    },
  },
  plugins: [],
}