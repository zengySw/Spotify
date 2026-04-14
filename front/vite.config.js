import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://uwupad.me",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/music/api"),
      },
      "/cdn": {
        target: "https://cdn.uwupad.me",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
      },
    },
  },
});