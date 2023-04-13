import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      base: "/",
      includeAssets: ["favicon.ico", "favicon.svg", "robots.txt", "apple-touch-icon.png"],
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Noteup",
        short_name: "Noteup",
        description: "Markdown note-taking made simple",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/pwa-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/pwa-512x512.png.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/pwa-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
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
