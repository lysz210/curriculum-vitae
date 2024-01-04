<template>
  <v-card id="istruzione_formazione">
    <v-card-text>
      <v-list>
        <v-list-item v-for="(_istruzione, istruzioneKey) in $tm('istruzione.corsi')" :key="istruzioneKey">
          <v-list-item-title v-html="$t(`istruzione.corsi.${istruzioneKey}.istituto`)"></v-list-item-title>
          <v-list-item-subtitle>{{ $t(`istruzione.corsi.${istruzioneKey}.periodo`) }}</v-list-item-subtitle>
          <div v-html="$t(`istruzione.corsi.${istruzioneKey}.corso`)"></div>
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
</script>