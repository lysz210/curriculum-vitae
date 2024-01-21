<template>
  <v-card id="istruzione_formazione">
    <v-card-text>
      <v-list>
        <v-list-item v-for="education in educations">
          <v-list-item-title v-html="education.istituto"></v-list-item-title>
          <v-list-item-subtitle>{{ education.periodo }}</v-list-item-subtitle>
          <div v-html="education.corso"></div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineI18nRoute({
  paths: {
    it: '/istruzione-formazione'
  }
})
const { locale } = useI18n()
const {data: educations} = await useFetch(`/me/knowledge/education`, {
  baseURL: computed(() => `/api/${locale.value}`)
})
</script>