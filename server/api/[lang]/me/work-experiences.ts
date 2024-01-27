import _ from 'lodash'
export default defineEventHandler( async (event) => {
  const i18nStorage = useStorage('i18n')
  return i18nStorage.getItem(`${getRouterParam(event, 'lang')}:me:work-experiences:`)
    .then(response => Array.isArray(response)
      ? _.reverse(_.sortBy(response, ['from']))
      : response
    )
})