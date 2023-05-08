/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050e16",
        secondary: "#a6b7c3",
        tertiary: "#101f30",
        "black-100": "#0d1a25",
        "black-200": "#031625",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 5px 32px -15px #2EDBFA",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
