import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";

export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  build: {
    rollupOptions: {
      external: ["react-router-dom"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
