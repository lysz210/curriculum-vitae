// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  nitro: {
    preset: 'aws-lambda',
    storage: {
      i18n: {
        driver: 'github',
        repo: 'lysz210/profile',
        branch: 'gh-pages',
        dir: 'i18n'
      }
    }
  },
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: [ 'vuetify' ]
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        // @ts-expect-error
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    }
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
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
