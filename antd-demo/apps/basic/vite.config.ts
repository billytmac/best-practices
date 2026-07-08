import { defineConfig } from "vite";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { lingui } from "@lingui/vite-plugin";
import { linguiMacroSwcPlugin } from "@lingui/swc-plugin/options";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    // @lingui/swc-plugin 展开成实际的字符串/ICU 格式代码,之后 React Compiler 才能正确分析这段代码的依赖关系、做自动 memoization 优化。
    react({
      plugins: [linguiMacroSwcPlugin()],
    }),
    babel({ presets: [reactCompilerPreset()] }),
    lingui(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
