/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{js,jsx,ts,tsx}',
    '!./node_modules/**',
    '!./.next/**',
    '!./dist/**',
    '!./build/**',
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
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        badgeIn: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          from: { transform: "scaleX(0)", opacity: "0", transformOrigin: "left" },
          to: { transform: "scaleX(1)", opacity: "1", transformOrigin: "left" },
        },
        lineGrowRight: {
          from: { transform: "scaleX(0)", opacity: "0", transformOrigin: "right" },
          to: { transform: "scaleX(1)", opacity: "1", transformOrigin: "right" },
        },
        scrollBar: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1.2s ease forwards",
        "badge-in": "badgeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "lineGrow 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow-right": "lineGrowRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-bar": "scrollBar 1.5s ease-in-out infinite",
      },

    },
  },
  plugins: [],
}
