import { load } from 'js-yaml'
import { from, filter, firstValueFrom, map, mergeMap, toArray } from 'rxjs'
import _ from 'lodash'
import { useFetch } from 'nuxt/app'

export default defineEventHandler( async (_event) => {
  const profileURL = 'https://lysz210.github.io/profile'
  const response$ = from($fetch('mix-manifest.json', { baseURL: profileURL })).pipe(
    // map(response => response?.data?.value),
    mergeMap((manifest: any) => (Object.values(manifest) as string[])),
    filter(path => path.startsWith('/i18n/en/me/social-accounts')),
    mergeMap(path => $fetch(path, { baseURL: profileURL })),
    // map(response => (response?.data?.value as string)),
    map(yaml => load((yaml as string))),
    toArray(),
    map(array => _.sortBy(array, 'ord'))
  )
  return firstValueFrom(response$)
})