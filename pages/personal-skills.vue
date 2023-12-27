<template>
  <section id="competenze-personali">
    <h1>{{ $t('competenze.title') }}</h1>
    <dl>
      <dt>
        {{ $t('competenze.lingue.madre.title') }}
      </dt>
      <dd>
        {{ $t('competenze.lingue.madre.content') }}
      </dd>

      <dt>
        {{ $t('competenze.lingue.altre.title') }}
      </dt>
      <dd>
        <table>
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
        </table>
      </dd>

      <dt>
        {{ $t('competenze.informatiche.title') }}
      </dt>
      <dd>
        <ul>
          <li v-for="(competenza, key) in $tm('competenze.informatiche.list')">
            <div v-if="competenza.title">
              {{ $t(`competenze.informatiche.list.${key}.title`) }}
              <ul v-if="competenza.content">
                <li v-for="(skill, skillKey) in $tm(`competenze.informatiche.list.${key}.content`)">
                  <div v-if="skill.title">
                    {{ $t(`competenze.informatiche.list.${key}.content.${skillKey}.title`) }}
                    <ul v-if="skill.content">
                      <li
                        v-for="(_, contentKey) in $tm(`competenze.informatiche.list.${key}.content.${skillKey}.content`)">
                        {{ $t(`competenze.informatiche.list.${key}.content.${skillKey}.content.${contentKey}`) }}
                      </li>
                    </ul>
                  </div>
                  <span v-else>{{ $t(`competenze.informatiche.list.${key}.content.${skillKey}`) }}</span>
                </li>
              </ul>
            </div>
            <span v-else>{{ $t(`competenze.informatiche.list.${key}`) }}</span>
          </li>
        </ul>
      </dd>

      <dt>
        {{ $t('competenze.patente.title') }}
      </dt>
      <dd>
        {{ $t('competenze.patente.content') }}
      </dd>
    </dl>
  </section>
</template>

<script setup>
defineI18nRoute({
  paths: {
    it: 'competenze'
  }
})
</script>