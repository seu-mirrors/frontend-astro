import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';

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
});
