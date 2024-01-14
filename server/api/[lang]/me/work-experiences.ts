import { serverQueryContent } from '#content/server'
export default defineEventHandler(event => serverQueryContent(event, `/lang/${getRouterParam(event, 'lang')}/me/work-experiences`)
  .only(["from","periodo","ruolo","azienda","attivita","settore"])
  .sort({ from: -1 })
  .find())