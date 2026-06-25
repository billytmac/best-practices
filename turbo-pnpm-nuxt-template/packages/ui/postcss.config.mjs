/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-mobile-forever": {
      appSelector: "#app",
      // viewportWidth: (file) => (file.includes("antd-mobile") ? 375 : 750),
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
    // 它会自动读取项目里的 browserslist 配置来决定需要兼容哪些浏览器,即用默认规则跑，不需要额外配置
    autoprefixer: {},
  },
};

export default config;
