/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.06)'
      },
      backgroundImage: {
        'metallic': 'linear-gradient(135deg,#b9b9b9 0%, #ffffff 100%)'
      }
    }
  },
  plugins: [],
}
