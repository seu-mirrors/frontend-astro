import { defineConfig } from 'vite'
import { fileURLToPath } from "node:url";
import { resolve } as path from "path";

const ExcludeFiles = ["src/server/main.js"];
const filesPathToExclude = ExcludeFiles.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    manifest: true,
    rollupOptions: {
      external: [
        ...filesPathToExclude
      ]
    },
    'assetsDir': '-/assets',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
})
