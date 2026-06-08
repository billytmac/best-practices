import { Geist, Geist_Mono } from "next/font/google";
import type { Viewport } from "next";

import "@workspace/ui/globals.css";
import "@workspace/ui/antd-mobile.css";
import "animate.css";

import { Providers } from "@/components/providers";
import { VConsole } from "@/components/VConsole";
import type { Metadata } from "next";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "turbo-next.js-template",
  description:
    "turbo-next.js-templat",
  // openGraph: {
  //   title: "facebook-share.jpg",
  //   description:
  //     "turbo-next.js-template",
  //   images: `${process.env.NEXT_PUBLIC_CDN_PATH}/facebook-share.jpg`,
  // },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="app">
        {/* className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `} */}
        <VConsole />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
