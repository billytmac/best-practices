"use client";

import { useEffect } from "react";

/**
 * VConsole 组件 - 仅在测试环境启用
 * 通过 NEXT_PUBLIC_APP_ENV 环境变量控制
 */
export function VConsole() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_APP_ENV, "process.env.NEXT_PUBLIC_APP_ENV");
    // 只在测试环境启用 VConsole
    if (
      process.env.NEXT_PUBLIC_APP_ENV === "test" ||
      process.env.NEXT_PUBLIC_APP_ENV === "development"
    ) {
      import("vconsole").then((module) => {
        const VConsole = module.default;
        new VConsole({
          theme: "dark",
          defaultPlugins: ["system", "network", "element", "storage"],
          maxLogNumber: 1000,
        });
        console.log("VConsole 已启用 - 测试环境");
      });
    }
  }, []);

  return null;
}
