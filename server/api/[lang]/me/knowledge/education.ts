import { serverQueryContent } from '#content/server'
export default defineEventHandler(event => serverQueryContent(event, `/lang/${getRouterParam(event, 'lang')}/me/knowledge/education`)
  .only(['periodo', 'istituto', 'corso'])
  .sort({ from: -1 })
  .find())