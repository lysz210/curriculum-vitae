<template>
  <v-card id="esperienze_professionali">
    <v-card-text>
      <v-timeline
        side="end"
      >
        <v-timeline-item dot-color="blue" v-for="(esperienza, esperienzaKey) in $tm('lavoro.esperienze')">
          <template v-slot:opposite>
            <v-card variant="flat">
              <v-card-subtitle>
                {{ $t(`lavoro.esperienze.${esperienzaKey}.periodo`) }}
              </v-card-subtitle>
            </v-card>
          </template>
          <v-card>
            <v-card-title v-html="mdT(`lavoro.esperienze.${esperienzaKey}.ruolo`)"></v-card-title>
            <v-card-subtitle v-html="mdT(`lavoro.esperienze.${esperienzaKey}.azienda`)"></v-card-subtitle>
            <v-card-text>
              <p class="settore">
                {{ $t(`lavoro.esperienze.${esperienzaKey}.settore`) }}
              </p>
              <v-list v-if="esperienza.attivita"
                density="compact"
              >
                <v-list-item
                  v-for="(_attivita, attivitaKey) in $tm(`lavoro.esperienze.${esperienzaKey}.attivita`)"
                  :subtitle="$t(`lavoro.esperienze.${esperienzaKey}.attivita.${attivitaKey}`)"
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
import { micromark } from 'micromark'
const { t } = useI18n()
defineI18nRoute({
  paths: {
    it: '/esperienze-lavorative'
  }
})
function mdT(key) {
  return micromark(t(key), {
    allowDangerousHtml: true
  })
}
</script>