<template>
  <v-card id="esperienze_professionali">
    <v-card-text>
      <v-timeline
        side="end"
      >
        <v-timeline-item dot-color="blue" v-for="esperienza in esperienze">
          <template v-slot:opposite v-if="!mobile">
            <v-card variant="flat">
              <v-card-subtitle>
                {{ esperienza.periodo }}
              </v-card-subtitle>
            </v-card>
          </template>
          <v-card>
            <v-card-subtitle v-if="mobile">
                {{ esperienza.periodo }}
            </v-card-subtitle>
            <v-card-title v-html="esperienza.ruolo"></v-card-title>
            <v-card-subtitle v-html="esperienza.azienda"></v-card-subtitle>
            <v-card-text>
              <p class="settore">
                {{ esperienza.settore }}
              </p>
              <v-list v-if="esperienza.attivita"
                density="compact"
              >
                <v-list-item
                  v-for="attivita in esperienza.attivita"
                  :subtitle="attivita"
                  >
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { mobile } = useDisplay()
defineI18nRoute({
  paths: {
    it: '/esperienze-lavorative'
  }
})
const { locale } = useI18n()
const {data: esperienze} = await useFetch(`/me/work-experiences`, {
  baseURL: computed(() => `/api/${locale.value}`)
})
</script>