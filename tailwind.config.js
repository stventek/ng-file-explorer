/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cyberpunk", "synthwave", "black"],
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'), require("daisyui")],
}

