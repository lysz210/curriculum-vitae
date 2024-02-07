import { defineStore } from "pinia";
import workExperiences from "~/server/api/[lang]/me/work-experiences";


export const useMeStore = defineStore('me', () => {
    const { locale } = useI18n()

    const personalData = ref({})
    const socials = ref([])
    const educations = ref([])
    const workExperiences = ref([])
    const languages = ref({})
    const skills = ref([])

    const baseURL = computed(() => `/api/${locale.value}/me`)

    const fetchMe = (path: string, ref: Ref) => useFetch(path, { baseURL })
        .then(response => response?.data?.value)
        .then(data => {
            // console.log('fetched', path, data)
            ref.value = data
        })

    const $reset = () => {
        fetchMe('/social-accounts', socials)
        fetchMe('/', personalData)
        fetchMe('/knowledge/education', educations)
        fetchMe('/work-experiences', workExperiences)
        fetchMe('/knowledge/languages', languages)
        fetchMe('/knowledge/it-skills', skills)
    }

    $reset()

    watch(locale, (newLocale, oldLocale) => {
        console.log('new', newLocale, 'old', oldLocale)
        $reset()
    })
    return {
        personalData,
        socials,
        educations,
        workExperiences,
        languages,
        skills,
        $reset
    }
})