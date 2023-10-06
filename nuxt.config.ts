// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
    'nuxt-icons',
  ],

  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
    },
  },

  auth: {
    // globalAppMiddleware: true, // 全域中間件檢查登入

    provider: {
      type: 'authjs', // local或authjs
    },
  },

  i18n: {
    strategy: 'no_prefix', // 網址的四種策略,no_prefix,prefix_except_default,prefix,prefix_and_default
    vueI18n: './i18n.config.ts',
    defaultLocale: 'zh-Hant',
    lazy: true,
    langDir: 'locales',
    locales: [
      {
        code: 'zh-Hant',
        iso: 'zh-Hant',
        file: 'zh-Hant.json',
        name: '繁體中文',
      },
      {
        code: 'ja',
        iso: 'ja',
        file: 'ja.json',
        name: '日本語',
      },
    ],
    // 瀏覽器語言檢測
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      alwaysRedirect: true, // 重定向並保留選擇
    },
  },

  // vue: {
  //   compilerOptions: {
  //     // 目前沒用到swiper-element
  //     isCustomElement: (tag) => tag.startsWith('swiper-'),
  //   },
  // },

  nitro: {
    routeRules: {
      '/laravel/**': {
        proxy: process.env.API_ENDPOINT + '/**',
      },
    },
  },
})
