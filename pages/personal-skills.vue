<template>
  <v-sheet id="competenze-personali">
    <v-card>
      <v-card-subtitle>
        {{ $t('competenze.lingue.madre.title') }}
      </v-card-subtitle>
      <v-card-title>
        {{ $t('competenze.lingue.madre.content') }}
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
              <th v-for="(_col, key) in $tm('competenze.lingue.altre.cols')">
                {{ $t(`competenze.lingue.altre.cols.${key}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lingua, key) in $tm('competenze.lingue.altre.list')">
              <td>{{ $t(`competenze.lingue.altre.list.${key}.name`) }}</td>
              <td v-for="(_col, colKey) in $tm('competenze.lingue.altre.cols')">
                {{ $t(`competenze.lingue.altre.list.${key}.${colKey}`) }}
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
          <v-expansion-panel v-for="(competenza, key) in $tm('competenze.informatiche.list')">
            <template v-if="competenza.title">
              <v-expansion-panel-title>
                {{ $t(`competenze.informatiche.list.${key}.title`) }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list v-if="competenza.content" density="compact">
                  <v-list-item v-for="(skill, skillKey) in $tm(`competenze.informatiche.list.${key}.content`)">
                    <template v-if="skill.title">
                      <v-list-item-title>
                        {{ $t(`competenze.informatiche.list.${key}.content.${skillKey}.title`) }}
                      </v-list-item-title>
                      <v-list-item-subtitle v-if="skill.content">
                        <span v-for="(_, contentKey) in $tm(`competenze.informatiche.list.${key}.content.${skillKey}.content`)" class="sub-skill">
                          {{ $t(`competenze.informatiche.list.${key}.content.${skillKey}.content.${contentKey}`) }}
                        </span>
                      </v-list-item-subtitle>
                    </template>
                    <v-list-item-title v-else>{{ $t(`competenze.informatiche.list.${key}.content.${skillKey}`) }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </template>
            <v-expansion-panel-title v-else>{{ $t(`competenze.informatiche.list.${key}`) }}</v-expansion-panel-title>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-subtitle>
        {{ $t('competenze.patente.title') }}
      </v-card-subtitle>
      <v-card-title>
        {{ $t('competenze.patente.content') }}
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
</script>

<style>
.sub-skill::after {
  content: ' - ';
}
.sub-skill:last-child::after {
  content: none;
}
</style>