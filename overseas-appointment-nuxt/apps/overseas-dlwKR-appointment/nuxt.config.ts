import process from 'node:process'
import { appDescription } from './app/constants/index'
import preload from './app/utils/preload'
import { currentLocales } from './i18n/i18n'

export default defineNuxtConfig({
  modules: [
    '@vant/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    './app/styles/vars.css',
    './app/styles/global.css',
    './app/styles/default-theme.css',
    'animate.css',
  ],
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
        maxDisplayWidth: 480,
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
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=false,maximumScale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover,user-scalable=false,maximumScale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      script: [
        { innerHTML: preload(), type: 'text/javascript', tagPosition: 'head' },
      ],
    },
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
  },

  experimental: {
    typedPages: true,
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

  compatibilityDate: '2025-07-18',
})
