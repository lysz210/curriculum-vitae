// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n'
  ],
  i18n: {
    lazy: true,
    langDir: 'lang',
    customRoutes: 'page',
    locales: [
      { code: 'en', name: 'English', file: 'en.yaml'},
      { code: 'it', name: 'Italiano', file: 'it.yaml'}
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false
    },
    vueI18n: 'vue-i18n.config.ts'
  }
})
