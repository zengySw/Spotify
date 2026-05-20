import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/jamendo": {
        target: "https://api.jamendo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jamendo/, "/v3.0"),
      },
      "/lastfm": {
        target: "https://ws.audioscrobbler.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lastfm/, "/2.0"),
      },
      "/spotify": {
        target: "https://api.spotify.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spotify/, "/v1"),
      },
    },
  },
});