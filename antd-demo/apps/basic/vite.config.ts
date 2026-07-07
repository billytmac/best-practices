import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    babel({ presets: [reactCompilerPreset()] }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    lingui(),
    babel({
      presets: [linguiTransformerBabelPreset()],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
