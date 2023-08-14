// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icons',
    '@sidebase/nuxt-auth',
  ],

  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      appName: process.env.APP_NAME,
    },
  },

  auth: {
    globalAppMiddleware: true,
  },
})
