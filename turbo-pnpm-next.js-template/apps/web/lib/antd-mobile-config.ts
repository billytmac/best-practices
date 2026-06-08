/**
 * Antd Mobile 配置
 * 配置 antd-mobile 使用 React 19 的 createRoot API
 */

"use client";

import { unstableSetRender } from "antd-mobile";
import { createRoot } from "react-dom/client";

// 扩展 Element 和 DocumentFragment 类型以支持 _reactRoot 属性
declare global {
  interface Element {
    _reactRoot?: any;
  }
  interface DocumentFragment {
    _reactRoot?: any;
  }
}

// 配置 antd-mobile 使用 React 19 的 createRoot
if (typeof window !== "undefined") {
  unstableSetRender((node, container) => {
    container._reactRoot ||= createRoot(container);
    const root = container._reactRoot;
    root.render(node);
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });

  console.log("✅ Antd Mobile configured for React 19");
}
