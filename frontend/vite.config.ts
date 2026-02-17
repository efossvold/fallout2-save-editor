import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import { analyzer,unstableRolldownAdapter } from 'vite-bundle-analyzer'
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    // unstableRolldownAdapter(analyzer({ analyzerPort: 9002 })),
    tailwindcss(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  build: {
    target: "baseline-widely-available",
  },
  resolve: {
    tsconfigPaths: true,
  },
});

const vitestConfig = defineTestConfig({
  test: { globals: true, environment: "node", include: ["**/*.test.ts"] },
});

export default mergeConfig(viteConfig, vitestConfig);
