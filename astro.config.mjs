import { defineConfig } from 'astro/config';
import deno from "@deno/astro-adapter";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: 'https://mirrors.seu.edu.cn',
  build: {
    assets: '-'
  },
  output: 'server',
  adapter: deno({
    start: false,
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});
