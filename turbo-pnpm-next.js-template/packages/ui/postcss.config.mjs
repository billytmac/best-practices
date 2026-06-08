/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    "postcss-mobile-forever": {
      appSelector: "#app",
      viewportWidth: (file) => (file.includes("antd-mobile") ? 375 : 750),
      maxDisplayWidth: 480,
      // 排除不需要转换的属性
      // propList: ["*", "!letter-spacing"],
      // // 排除某些选择器
      // selectorBlackList: [],
      // // 排除某些文件
      // exclude: [/antd-mobile/i],
      // // 是否横屏
      // landscape: false,
      // // 横屏时的宽度
      // landscapeWidth: 1024,
    },
    autoprefixer: {},
  },
};

export default config;
