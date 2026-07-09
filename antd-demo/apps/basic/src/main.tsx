import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { i18n } from "@lingui/core";
import { loadLocaleCatalog } from "./locales/loadLocaleCatalog";
import { useSettingsStore } from "./stores/settings";
import { useAuthStore } from "./stores/auth";
import { installHttpRouter } from "./utils/http";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent", // 表示鼠标 hover 链接时就预加载对应路由,提升体验,常见配置。
  scrollRestoration: true, // 开启路由切换时的滚动位置记忆,也是常见配置。
});

installHttpRouter(router);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  const enableMockInBuild = import.meta.env.VITE_ENABLE_MOCK === "true";
  if (!import.meta.env.DEV && !enableMockInBuild) return;
  const { worker } = await import("./mocks/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking()
  .then(async () => {
    await Promise.all([useSettingsStore.persist.rehydrate(), useAuthStore.persist.rehydrate()]);

    const initialLocale = useSettingsStore.getState().locale;
    const messages = await loadLocaleCatalog(initialLocale);
    i18n.load(initialLocale, messages);
    i18n.activate(initialLocale);
    document.documentElement.lang = initialLocale === "zh" ? "zh" : "en";
    document.documentElement.dir = "ltr";

    createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    );
  })
  .catch((err) => {
    console.error("Failed to initialize app:", err);
  });
