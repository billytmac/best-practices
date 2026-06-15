import path from 'node:path'
import process from 'node:process'
import { appDescription, appName, appKeywords, baseURLMap } from './app/constants/index'
import preload from './app/utils/preload'
import { currentLocales } from './i18n/i18n'
import type { BuildTarget } from './app/types/global.d.ts'

// 通过 BUILD_TARGET 环境变量切换 PC / Mobile 打包配置
// pc:    cdnURL -> .../pc      maxDisplayWidth: 750
// mobile: cdnURL -> .../mobile  maxDisplayWidth: 480
const buildTarget = process.env.BUILD_TARGET as BuildTarget
const isPc = buildTarget?  buildTarget.includes('pc') : true
const cdnURL = `https://cdn.dawnbreaking.com/reserve-dlw-korea-pre/${buildTarget}`
const maxDisplayWidth = isPc ? 750 : 480


export default defineNuxtConfig({
  modules: [
    '@vant/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    // '@teages/nuxt-legacy'
  ],
  
  // legacy: {
  //   vite: {}, // `@vitejs/plugin-legacy` options
  // },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      buildTarget: process.env.BUILD_TARGET ?? 'pc',
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    './app/styles/vars.css',
    './app/styles/global.css',
    './app/styles/default-theme.css',
    'animate.css',
  ],
  // image: {
  //   // 强制指定 provider
  //   provider: 'ipx',
  //   // 告诉 Nuxt 允许并代理这个 CDN 域名
  //   domains: ['https://cdn.dawnbreaking.com'], 
  //   alias: {
  //     // 设置快捷别名，将 cdn 映射到你的实际 CDN 地址
  //     cdn: 'https://cdn.dawnbreaking.com/reserve-dlw-korea-pre/mobile'
  //   }
  // },
  // unocss: {
  //   // 禁用自动注入，改为手动在 app.vue 引入
  //   injectPosition: 'last' // 或 'last'，根据需要调整
  // },
  // vant: {
  //   // importStyle: true,  
  // },

  postcss: {
    plugins: {
      'autoprefixer': {},

      // https://github.com/wswmsword/postcss-mobile-forever
      'postcss-mobile-forever': {
        appSelector: '#apppointment-mobile',
        viewportWidth: (file: string) => {
          return file.includes('vant') ? 375 : 750
        },
        maxDisplayWidth,
        // devtools excluded
        exclude: /@nuxt/,
        border: true,
        // Need to convert fixed selector list
        rootContainingBlockSelectorList: [
          '.van-tabbar',
          '.van-popup',
          '.van-popup--bottom',
          '.van-popup--top',
          '.van-popup--left',
          '.van-popup--right',
        ],
      },
    },
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
    locales: currentLocales,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
    },
    langDir: 'locales',
    defaultLocale: 'zh-CN',
    // Reletive to the i18n directory
    vueI18n: './i18n.config.ts',
  },

  app: {
    head: {
      title: appName,
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${process.env.NODE_ENV === 'development' ? '' : cdnURL}/favicon.ico?v=` + new Date().getTime()
        }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover,user-scalable=false,maximumScale=1' },
        { name: 'description', content: appDescription },
        {name: 'keywords', content: appKeywords},
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=false,maximumScale=1',
      script: [
        { innerHTML: preload(), type: 'text/javascript', tagPosition: 'head' },
      ],
    },
    cdnURL,
    baseURL: baseURLMap[buildTarget] ?? '/'
  },

  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: [
        '@intlify/core-base',
        '@intlify/shared',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
    define: {
      __BUILD_TARGET__: JSON.stringify(process.env.BUILD_TARGET ?? 'pc'),
    },
  },

  experimental: {
    typedPages: true,
    // entryImportMap: false
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    shim: false,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  hooks: {
    'pages:extend': function (pages) {
      console.log(buildTarget,'buildTarget123')
      if (!buildTarget) return
      const rootPage = pages.find(p => p.path === '/')
      if (rootPage?.file) {
        const pagesDir = path.dirname(String(rootPage.file))
        rootPage.file = path.join(pagesDir, buildTarget, 'index.vue')
        console.log(rootPage.file, 'rootPage.file')
      }
    },
  },

  compatibilityDate: '2025-07-18',
})
