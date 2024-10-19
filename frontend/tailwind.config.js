/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        imbue: ["Imbue", "serif"], // Ajout de la police Imbue
        dancing: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
