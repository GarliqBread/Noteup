import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

import manifest from "./manifest.json";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest,
      includeAssets: ["favicon.ico", "favicon.svg", "robots.txt", "apple-touch-icon.png"],
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  server: { port: 3000 },
  build: {
    chunkSizeWarningLimit: 1500,
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
