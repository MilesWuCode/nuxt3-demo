// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/apollo',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
      apiEndpoint: process.env.API_ENDPOINT,
      pusher: {
        appKey: process.env.PUSHER_APP_KEY,
        appHost: process.env.PUSHER_HOST,
        appPort: process.env.PUSHER_PORT,
        appCluster: process.env.PUSHER_APP_CLUSTER,
      },
    },
    auth: {
      secret: process.env.AUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,

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

  // Hybrid Rendering
  // routeRules: {
  //   '/post': { ssr: false },
  // },

  router: {
    // https://router.vuejs.org/api/interfaces/RouterOptions.html
    options: {
      linkActiveClass: 'active', // 模糊
      // linkExactActiveClass: 'active', // 精準
    },
  },

  // 全域CSS
  css: ['@/assets/css/main.css'],

  apollo: {
    // autoImports: true,
    // authType: 'Bearer',
    // authHeader: 'Authorization',
    // tokenStorage: 'cookie',
    // proxyCookies: true,
    clients: {
      default: {
        // httpEndpoint: 'http://localhost/graphql',
        httpEndpoint: 'https://spacex-production.up.railway.app',
      },
    },
  },

  image: {
    domains: ['localhost'],
  },
})
