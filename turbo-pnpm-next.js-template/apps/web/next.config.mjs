/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "antd-mobile"],
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // 配置静态资源的 CDN 前缀
  // 开发环境为空，生产/测试环境使用 CDN
  assetPrefix: process.env.NEXT_PUBLIC_CDN_PATH || "",
  reactCompiler: true,
};

export default nextConfig;
