export default defineEventHandler( async (event) => {
  const i18nStorage = useStorage('i18n')
  return i18nStorage.getItem(`${getRouterParam(event, 'lang')}:me:knowledge:languages:`)
  .then(response => {
    if (Array.isArray(response)) {
      return response[0]
    }
    return response || null
  })
})