/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope"],
      },
      colors: {
        primaryGreen: "#A1FF00",
        secondaryLightGreen: "#F1FFD8",
        rewardLightGreen: "#dcf5b0",
        darkGray: "#333333",
        darkerGray: "#191919",
        lightGray: "#D9D9D9",
        black: "#000000",
        white: "#FFFFFF",
      },
    },
  },
  darkMode: "class",
  plugins: [],
  // important: '.your-app',
};
