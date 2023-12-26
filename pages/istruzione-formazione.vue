<template>
  <section id="istruzione_formazione">
    <h1>{{ $t('istruzione.title') }}</h1>
    <dl>
      <template v-for="(istruzione, istruzioneKey) in $tm('istruzione.corsi')">
        <dt>
            {{ $t(`istruzione.corsi.${istruzioneKey}.periodo`) }}
        </dt>
        <dd>
          <p v-html="$t(`istruzione.corsi.${istruzioneKey}.istituto`)"></p>
          <p v-html="$t(`istruzione.corsi.${istruzioneKey}.corso`)"></p>
        </dd>
      </template>
    </dl>
  </section>
</template>