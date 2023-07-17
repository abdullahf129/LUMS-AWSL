/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        // => @media (min-width: 375px) { ... }
      },
    },
  },
  plugins: [require('daisyui')],
}
