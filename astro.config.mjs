import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: 'https://mirrors.seu.edu.cn',
  build: {
    assets: '-'
  },
  output: 'server',
  adapter: deno(), 
});
