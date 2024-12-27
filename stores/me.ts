import { defineStore } from "pinia";

import { from, filter, map, mergeMap, toArray, of, groupBy, zip } from 'rxjs'
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
    
    const $reset = () => {
        const profile$ = from(useFetch('mix-manifest.json', { baseURL: profileURL })).pipe(
            map(response => response?.data?.value),
            mergeMap((manifest: any) => (Object.values(manifest) as string[])),
            filter(path => /.*\.json$/.test(path)),
            mergeMap(path => zip(
                of(mapKey(path)),
                from(useFetch(path, { baseURL: profileURL })).pipe(
                    map(response => (response?.data?.value)),
                )
            )),
            groupBy(
                ([path]) =>  path,
                {
                    element: ([_path, data]) => data
                }
            )
        )
        profile$.pipe(
            filter(group => group.key === 'socials'),
            mergeMap(group => group),
            toArray(),
            map(array => _.sortBy(array, 'ord'))
        ).subscribe(data => socials.value = data)
        profile$.pipe(
            filter(group => group.key === 'personalData'),
            mergeMap(group => group)
        ).subscribe(data => personalData.value = data)
        profile$.pipe(
            filter(group => group.key === 'workExperiences'),
            mergeMap(group => group),
            toArray(),
            map(array => _.reverse(_.sortBy(array, 'from')))
        ).subscribe(data => workExperiences.value = data)
        profile$.pipe(
            filter(group => group.key === 'languages'),
            mergeMap(group => group)
        ).subscribe(data => languages.value = data)
        profile$.pipe(
            filter(group => group.key === 'skills'),
            mergeMap(group => group),
            toArray(),
            map(array => _.sortBy(array, 'ord'))
        ).subscribe(data => skills.value = data)
        profile$.pipe(
            filter(group => group.key === 'educations'),
            mergeMap(group => group),
            toArray(),
            map(array => _.reverse(_.sortBy(array, 'from')))
        ).subscribe(data => educations.value = data)
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