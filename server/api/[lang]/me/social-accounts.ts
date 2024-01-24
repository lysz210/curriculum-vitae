import { serverQueryContent } from '#content/server'
export default defineEventHandler((event) => serverQueryContent(event, '/i18n/en/me/social-accounts')
  .only(['name', 'username', 'icon', 'color', 'url'])
  .find())