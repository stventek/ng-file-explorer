/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cyberpunk"],
  },
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
}

