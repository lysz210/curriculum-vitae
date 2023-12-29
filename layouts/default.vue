<template>
  <v-app>
    <section id="informazioni_personali">
      <h1>{{ $t('anagrafica.title') }}</h1>
      <dl>
        <dt>
          {{ $t('anagrafica.nominativo.title') }}
        </dt>
        <dd>
          <p>
            <span id="nome">{{ $t('anagrafica.nominativo.nome') }}</span> <span id="cognome">{{
              $t('anagrafica.nominativo.cognome') }}</span>
          </p>
        </dd>
        <!-- @if($withMail)
          <dt>Email</dt>
          <dd>{{ env('MAIL_PERSONAL') }}</dd>
          @endif -->
        <dt>
          {{ $t('anagrafica.socials.title') }}
        </dt>
        <!-- <dd>
              <dl id="contatti_social">
                  @foreach (json_decode(Storage::disk('data')->get('me/social-accounts.json')) as $social)
                  <dt>{{ $social->name }}</dt>
                  <dd>
                      <a href="{{ $social->url }}" target="blank">{{ $social->username }}</a>
                  </dd>
                  @endforeach
                  <dt>
                      Skype
                  </dt>
                  <dd class="last">
                      lysz210
                  </dd>
                  <dt class="print_only">
                      Curriculum online
                  </dt>
                  <dd class="print_only">
                      <a href="{{Request::url()}}" target="blank">Curriculum vitae online</a>
                  </dd>
              </dl>
          </dd> -->
      </dl>
    </section>
  
    <AppLanguageSwitcher /> -
  
    <NuxtLink :to="localPath({ name: 'education' })">{{ $t('istruzione.title') }}</NuxtLink> -
    <NuxtLink :to="localPath({ name: 'experience' })">{{ $t('lavoro.title') }}</NuxtLink> -
    <NuxtLink :to="localPath({ name: 'personal-skills' })">{{ $t('competenze.title') }}</NuxtLink>
    <slot></slot>
  </v-app>
</template>

<script setup>
const localPath = useLocalePath()
</script>