import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "production" &&
      prerender({
        staticDir: path.join(__dirname, "dist"),
        routes: [
          "/",
          "/bubble",
          "/pinnpm",
          "/watools",
          "/airtable",
          "/linkedin",
          "/unstream",
          "/newsletter-confirmation",
          "/bubble/newsletter-confirmed",
        ],
        renderer: new prerender.PuppeteerRenderer({
          renderAfterTime: 3000,
        }),
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
