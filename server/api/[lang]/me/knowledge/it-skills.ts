import { load } from 'js-yaml'
import { from, filter, firstValueFrom, map, mergeMap, toArray } from 'rxjs'
import _ from 'lodash'

export default defineEventHandler( async (event) => {
  const i18nStorage = useStorage('i18n')
  const keyPrefix = `${getRouterParam(event, 'lang')}:me:knowledge:it-skills:`
  const response$ = from(i18nStorage.getKeys()).pipe(
    mergeMap(list => list),
    filter(key => key.startsWith(keyPrefix)),
    mergeMap(key => i18nStorage.getItem(key)),
    map(item => item as string),
    map(item => load(item)),
    toArray(),
    map(array => _.sortBy(array, 'ord'))
  )
  return firstValueFrom(response$)
})