/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      colors: {
        paille: '#c8a96e',
        terre: '#8b6c47',
        chaux: '#f5f0e8',
        mousse: '#5a6e4a',
        bois: '#3d2b1f',
      },
    },
  },
  plugins: [],
}
