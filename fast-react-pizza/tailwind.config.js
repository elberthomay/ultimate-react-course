/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: "auto 1fr auto",
      },
      fontFamily: {
        sans: "Roboto Mono, monospace",
      },
      height: {
        screen: "100 dvh",
      },
    },
  },
  plugins: [],
};
