const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          1: "#AEDA38",
          2: "#41D261",
          3: "#459858",
        },
        grey: {
          1: "#D9D9D9"
        }
      },
    },
  },
  plugins: [],
});


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         green: {
//           "1": "#AEDA38",
//           "2": "#41D261",
//           "3": "#459858"
//         }
//       }
//     },
//   },
//   plugins: [],
// }

// const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
//   content: ["./pages/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         green: {
//           1: "#AEDA38",
//           2: "#41D261",
//           3: "#459858",
//         },
//       },
//     },
//   },
//   plugins: [],
// });
