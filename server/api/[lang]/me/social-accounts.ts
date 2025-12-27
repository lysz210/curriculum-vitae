import _ from 'lodash'

export default defineEventHandler( async (_event) => {
  const profileURL = 'https://lysz210.github.io/profile'
  const manifest: Record<string, string> = await $fetch('mix-manifest.json', { baseURL: profileURL })

  const socialAccounts = await Promise.all(
    Object.values(manifest)
    .filter((path: string) => path.startsWith('/i18n/en/me/social-accounts') && path.endsWith('.json'))
    .map(path => $fetch(path, { baseURL: profileURL })))
  
  return _.sortBy(socialAccounts, 'ord')
})