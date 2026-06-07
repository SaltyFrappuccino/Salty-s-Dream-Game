import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@sdg/shared": fileURLToPath(new URL("../../packages/shared/src/index.ts", import.meta.url)),
      "@sdg/game-core": fileURLToPath(new URL("../../packages/game-core/src/index.ts", import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/phaser")) {
            return "phaser";
          }

          if (id.includes("node_modules/socket.io-client") || id.includes("node_modules/engine.io-client")) {
            return "socket";
          }

          if (id.includes("node_modules/react") || id.includes("node_modules/react-router-dom")) {
            return "react";
          }

          return undefined;
        }
      }
    }
  },
  server: {
    port: 5173
  }
});
