// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: [ 'vuetify' ]
  },
  modules: [
    '@nuxt/content',
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
  },
  content: {
    sources: {
      i18n: {
        prefix: '/i18n',
        driver: resolve('./utils/dynamoDbStorage.mjs'),
      }
    }
  }
})
