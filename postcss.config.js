import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import autoprefixer from "autoprefixer";

import postcssImport from "postcss-import";

export default {
  plugins: [
    postcssImport,
    tailwind(tailwindConfig),
    autoprefixer,
  ],
};
