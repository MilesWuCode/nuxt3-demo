// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icons',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n',
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
    // 全域中間件檢查登入
    // globalAppMiddleware: true,

    provider: {
      // local或authjs
      type: 'authjs',
    },
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'zh-Hant',
    lazy: true,
    langDir: 'locales',
    locales: [
      {
        code: 'zh-Hant',
        file: 'zh-Hant.json',
        name: '繁體中文',
      },
      {
        code: 'ja',
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
})
