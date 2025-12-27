<template>
  <v-sheet id="competenze-personali">
    <v-card>
      <v-card-subtitle>
        {{ $t('competenze.lingue.madre.title') }}
      </v-card-subtitle>
      <v-card-title>
        {{ languages['mother-tongue'] }}
      </v-card-title>
    </v-card>
    <v-card>
      <v-card-subtitle>
        {{ $t('competenze.lingue.altre.title') }}
      </v-card-subtitle>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th> </th>
              <th v-for="key in languageKeys">
                {{ $t(`competenze.lingue.altre.cols.${key}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lingua in languages.others">
              <td>{{ lingua.name }}</td>
              <td v-for="colKey in languageKeys">
                {{ lingua[colKey] }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6" v-html="$t('competenze.lingue.altre.footer')"></td>
            </tr>
          </tfoot>
        </v-table>
      </v-card-text>

    </v-card>
    <v-card>
      <v-card-subtitle>
        {{ $t('competenze.informatiche.title') }}
      </v-card-subtitle>
      <v-card-text>
        <v-expansion-panels variant="accordion" multiple>
          <v-expansion-panel v-for="competenza in skills">
            <template v-if="competenza.title">
              <v-expansion-panel-title>
                {{ competenza.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list v-if="competenza.content" density="compact">
                  <v-list-item v-for="(skill, skillKey) in competenza.content">
                    <template v-if="skill.title">
                      <v-list-item-title>
                        {{ skill.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle v-if="skill.content">
                        <span v-for="subSkill in skill.content" class="sub-skill">
                          {{ subSkill }}
                        </span>
                      </v-list-item-subtitle>
                    </template>
                    <v-list-item-title v-else>{{ skill }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </template>
            <v-expansion-panel-title v-else>{{ competenza }}</v-expansion-panel-title>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-subtitle>
        {{ $t('competenze.patente.title') }}
      </v-card-subtitle>
      <v-card-title>
        {{ personalData.drivingLicence }}
      </v-card-title>
    </v-card>
      
  </v-sheet>
</template>

<script setup>
defineI18nRoute({
  paths: {
    it: '/competenze'
  }
})
const { locale, tm } = useI18n()
const languageKeys = Object.keys(tm('competenze.lingue.altre.cols'))


const {
  languages,
  skills,
  personalData
} = storeToRefs(useMeStore())
</script>

<style>
.sub-skill::after {
  content: ' - ';
}
.sub-skill:last-child::after {
  content: none;
}
</style>