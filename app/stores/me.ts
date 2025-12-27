import { defineStore } from "pinia";
import _ from 'lodash'

type ProfileKey = 
    'unknown'
    | 'socials'
    | 'personalData'
    | 'educations'
    | 'workExperiences'
    | 'languages'
    | 'skills'
    

export const useMeStore = defineStore('me', () => {
    const { locale } = useI18n()

    const personalData: Ref<any> = ref({})
    const socials: Ref<any[]> = ref([])
    const educations: Ref<any[]> = ref([])
    const workExperiences: Ref<any[]> = ref([])
    const languages: Ref<any> = ref({})
    const skills: Ref<any[]> = ref([])

    const profileURL = 'https://lysz210.github.io/profile'

    const startsWith = (path: string, search: string) => path.startsWith(`/i18n/${locale.value}/me/${search}`)
    const mapKey = (path: string): ProfileKey => {
        if (path.startsWith('/i18n/en/me/social-accounts')) {
            return 'socials'
        } else if(startsWith(path, 'index')) {
            return 'personalData'
        } else if (startsWith(path, 'work-experiences')) {
            return 'workExperiences'
        } else if (startsWith(path, 'knowledge/education')) {
            return 'educations'
        } else if (startsWith(path, 'knowledge/it-skills')) {
            return 'skills'
        } else if (startsWith(path, 'knowledge/languages')) {
            return 'languages'
        }
        return 'unknown'
    }

    const fetchAll = async (paths: string[]) => {
        return Promise.all(
            paths.map(path => 
                useFetch(path, { baseURL: profileURL }).then(response => response?.data?.value)
            )
        )
    }

    const $reset = async () => {
        const { data: manifest } = await useFetch('mix-manifest.json', { baseURL: profileURL })

        const profilePaths = _.groupBy(
            Object.values(manifest.value).filter((path: string) => path.endsWith('.json')),
            mapKey)

        if (profilePaths['socials']) {
            const socialsData = await fetchAll(profilePaths['socials'])
            socials.value = _.sortBy(socialsData, 'ord')
        }
        if (profilePaths['personalData']) {
            const [personalDataValue] = await fetchAll(profilePaths['personalData'])
            personalData.value = personalDataValue
        }
        if (profilePaths['workExperiences']) {
            const workExperiencesData = await fetchAll(profilePaths['workExperiences'])
            workExperiences.value = _.reverse(_.sortBy(workExperiencesData, 'from'))
        }
        if (profilePaths['languages']) {
            const [languagesValue] = await fetchAll(profilePaths['languages'])
            languages.value = languagesValue
        }
        if (profilePaths['skills']) {
            const skillsData = await fetchAll(profilePaths['skills'])
            skills.value = _.sortBy(skillsData, 'ord')
        }
        if (profilePaths['educations']) {
            const educationsData = await fetchAll(profilePaths['educations'])
            educations.value = _.reverse(_.sortBy(educationsData, 'from'))
        }
    }

    $reset()

    watch(locale, (_newLocale, _oldLocale) => {
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