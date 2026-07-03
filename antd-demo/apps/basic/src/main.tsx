import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
// import App from "./App.tsx";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent", // 表示鼠标 hover 链接时就预加载对应路由,提升体验,常见配置。
  scrollRestoration: true, // 开启路由切换时的滚动位置记忆,也是常见配置。
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
);
