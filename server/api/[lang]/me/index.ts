import { load } from 'js-yaml'
import { of, map, mergeMap, firstValueFrom } from 'rxjs'

export default defineEventHandler( async (event) => {
  const i18nStorage = useStorage('i18n')
  const response$ = of(getRouterParam(event, 'lang'))
    .pipe(
      map(lang => `${lang}:me:index.yaml`),
      mergeMap(key => i18nStorage.getItem(key)),
      map(item => item as string),
      map(item => load(item))
    )
  return firstValueFrom(response$)
})