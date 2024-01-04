export default defineNuxtPlugin(nuxtApp => {
    const switchLocalePath = useSwitchLocalePath()
    window.addEventListener(
        'message',
        ({ data: { command, language } }) => {
            const { locale } = nuxtApp.$i18n;
            if (command === 'switch-language' && language !== locale.value) {
                const localizedPath = switchLocalePath(language);
                if (localizedPath) {
                    nuxtApp.$router.push(localizedPath)
                    console.log(command, language, localizedPath)
                } else {
                    console.log(command, 'no locale', language)
                }
            }
        }
    )
})