import { from, filter, firstValueFrom, map, mergeMap, toArray } from 'rxjs'
import _ from 'lodash'

export default defineEventHandler( async (_event) => {
  const profileURL = 'https://lysz210.github.io/profile'
  const response$ = from($fetch('mix-manifest.json', { baseURL: profileURL })).pipe(
    mergeMap((manifest: any) => (Object.values(manifest) as string[])),
    filter(path => path.startsWith('/i18n/en/me/social-accounts') && path.endsWith('.json')),
    mergeMap(path => $fetch(path, { baseURL: profileURL })),
    toArray(),
    map(array => _.sortBy(array, 'ord'))
  )
  return firstValueFrom(response$)
})