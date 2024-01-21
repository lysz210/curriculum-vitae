import { parseContent } from '#content/server'
import _ from 'lodash';

export default defineEventHandler( async (event) => {
  const i18nStorage = useStorage('i18n')
  const keys = await i18nStorage.getKeys();
  let response = []
  for (let key of keys) {
    const content = await i18nStorage.getItem(key)
    const parsed = await parseContent(key, content)
    response.push(_.omitBy(parsed, (_v, k) => {
      console.log(k, typeof k)
      return k.startsWith('_')
    }))
  }
  return response
})
