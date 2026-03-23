import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const normalizeBasePath = (rawBasePath?: string) => {
  if (!rawBasePath || rawBasePath === "/") {
    return "/";
  }

  return `/${rawBasePath.replace(/^\/+|\/+$/g, "")}/`;
};

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("/three/")) {
            return "three-core";
          }

          if (id.includes("@react-three/fiber")) {
            return "react-three-fiber";
          }

          if (id.includes("@react-three/drei")) {
            return "react-three-drei";
          }
        },
      },
    },
  },
}));
