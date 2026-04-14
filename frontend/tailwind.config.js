/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './frontend/app/**/*.{js,jsx,ts,tsx}',
    './frontend/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        // Couleurs extraites des screenshots
        'header-bg': '#3d1a0e',   // brun très foncé du header
        'terra': '#8b3a2a',   // terracotta boutons/footer
        'terra-light': '#c4613a',   // terracotta clair section porte ouverte
        'paille-bg': '#c8824a',   // fond orange paille général
        'card-paille': '#c8a040',   // carte jaune paille
        'card-terre': '#c06030',   // carte orange terre
        'card-photo': '#6a8e9a',   // carte bleu-gris photovoltaïque
        'footer-bg': '#c4613a',   // footer terracotta
      },
    },
  },
  plugins: [],
}
