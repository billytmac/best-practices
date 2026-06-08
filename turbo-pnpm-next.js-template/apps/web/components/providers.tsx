"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// 导入 antd-mobile 配置（客户端初始化）
import "@/lib/antd-mobile-config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
