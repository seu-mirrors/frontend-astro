import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [typography],
  theme: {
    extend: {
      maxWidth: {
        caddy: "1200px",
      },
      padding: {
        "caddy": "5%",
      },
      screens: {
        "lg": "800px",
      },
      letterSpacing: {
        wide: ".015em",
      },
    },
  },
  content: ["./src/**/*.{svelte,js,ts,astro}"], //for unused css
  darkMode: 'class',
};
