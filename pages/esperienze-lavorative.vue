<template>
  <section id="esperienze_professionali">
    <h1>{{ $t('lavoro.title') }}</h1>
    <dl>
    <template v-for="(esperienza, esperienzaKey) in $tm('lavoro.esperienze')">
      <dt>{{ $t(`lavoro.esperienze.${esperienzaKey}`) }}</dt>
      <dd>
          <h2 v-html="$t(`lavoro.esperienze.${esperienzaKey}.ruolo`)"></h2>
          <p v-html="$t(`lavoro.esperienze.${esperienzaKey}.azienda`)"></p>
          <!-- <ul v-if="esperienza.attivita">
              <li v-for="(_, attivitaKey) in $tm(`lavoro.esperienze.${esperienzaKey}.attivita`)">
                {{ $t(`lavoro.esperienze.${esperienzaKey}.attivita.${attivitaKey}`) }}
              </li>
          </ul> -->
          <p class="settore">
              {{ $t(`lavoro.esperienze.${esperienzaKey}.settore`) }}
          </p>
      </dd>
    </template>
    </dl>
</section>
</template>