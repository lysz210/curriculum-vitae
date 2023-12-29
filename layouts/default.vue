<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        {{ $t('anagrafica.nominativo.nome') }} {{ $t('anagrafica.nominativo.cognome') }}
      </v-app-bar-title>
      <template v-slot:append>
        <AppLanguageSwitcher /> 
      </template>
    </v-app-bar>
    <v-main>
      <v-tabs align-tabs="center">
        <v-tab :to="localPath({ name: 'education' })">{{ $t('istruzione.title') }}</v-tab>
        <v-tab :to="localPath({ name: 'experience' })">{{ $t('lavoro.title') }}</v-tab>
        <v-tab :to="localPath({ name: 'personal-skills' })">{{ $t('competenze.title') }}</v-tab>
      </v-tabs>
      <v-container id="informazioni_personali">
        <dl>
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
      </v-container>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup>
const localPath = useLocalePath()
</script>