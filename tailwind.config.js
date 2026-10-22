// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {},
//       fontFamily: {
//         heading: ["Clash Display", "sans-serif"],
//         line: ["DM Sans", "sans-serif"],
       
//       },
//       keyframes: {
//         marquee: {
//           "0%": { transform: "translateX(0%)" },
//           "100%": { transform: "translateX(-50%)" },
//         },
//       },
//       animation: {
//         marquee: "marquee 22s linear infinite",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        heading: ["'Clash Display'", "sans-serif"],
        line: ["'DM Sans'", "sans-serif"],
      },
      // Infinite smooth sliding animation:
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
