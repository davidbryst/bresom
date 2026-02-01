import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          )
            return "vendor-react";
          // Remix runtime
          if (id.includes("node_modules/@remix-run/"))
            return "vendor-remix";
          // Animation libraries
          if (id.includes("node_modules/gsap")) return "vendor-gsap";
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/motion")
          )
            return "vendor-motion";
          // PDF generation
          if (id.includes("node_modules/@react-pdf")) return "vendor-pdf";
          // Physics engine
          if (id.includes("node_modules/matter-js")) return "vendor-physics";
          // Icon libraries
          if (
            id.includes("node_modules/lucide-react") ||
            id.includes("node_modules/react-icons") ||
            id.includes("node_modules/@fortawesome") ||
            id.includes("node_modules/@phosphor-icons")
          )
            return "vendor-icons";
          // Smooth scrolling
          if (id.includes("node_modules/lenis")) return "vendor-scroll";
        },
      },
    },
  },
});
