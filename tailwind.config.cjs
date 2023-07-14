/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      gray: {
        500: "#717070",
        200: "#F4ECE2",
      },
      red: "#E77070",
      blue: "#0e9ac7",
    },
    extend: {
      fontFamily: {
        sans: "Rajdhani, sans-serif",
        body: "Roboto, sans-serif",
      },
    },
  },
  plugins: [],
};
