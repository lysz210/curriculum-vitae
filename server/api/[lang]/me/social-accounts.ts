import { load } from 'js-yaml'
import { from, filter, firstValueFrom, map, mergeMap, toArray } from 'rxjs'
import _ from 'lodash'

export default defineEventHandler( async (_event) => {
  const i18nStorage = useStorage('i18n')
  const response$ = from(i18nStorage.getKeys()).pipe(
    mergeMap(list => list),
    filter(key => key.startsWith('en:me:social-accounts:')),
    mergeMap(key => i18nStorage.getItem(key)),
    map(item => Array.isArray(item) ? item[0] : item || null),
    map(item => load(item)),
    toArray(),
    map(array => _.sortBy(array, 'ord'))
  )
  return firstValueFrom(response$)
})