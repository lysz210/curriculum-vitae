<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        {{ lysz210.name }} {{ lysz210.surname }}
      </v-app-bar-title>
      <template v-slot:append>
        <AppLanguageSwitcher /> 
      </template>
      <template v-slot:extension>
        <v-tabs grow align-tabs="center">
          <v-tab :to="localPath({ name: 'education' })">{{ $t('istruzione.title') }}</v-tab>
          <v-tab :to="localPath({ name: 'experience' })">{{ $t('lavoro.title') }}</v-tab>
          <v-tab :to="localPath({ name: 'personal-skills' })">{{ $t('competenze.title') }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container id="informazioni_personali">
        <v-chip
        v-for="social of socials"
        :href="social.url"
        :color="social.color"
        :prepend-icon="social.icon"
        variant="flat"
        target="_blank"
        >
        <strong>{{ social.username }}</strong>@{{ social.name }}
        </v-chip>
      </v-container>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup>
const localPath = useLocalePath()
const { locale } = useI18n()
const {data: socials} = await useLazyFetch(`/me/social-accounts`, {
  baseURL: computed(() => `/api/${locale.value}`)
})
const {data: lysz210} = await useFetch(`/me`, {
  baseURL: computed(() => `/api/${locale.value}`)
})
</script>