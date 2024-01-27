export default defineEventHandler( async (event) => {
  const i18nStorage = useStorage('i18n')
  return i18nStorage.getItem(`${getRouterParam(event, 'lang')}:me:knowledge:education`)
})