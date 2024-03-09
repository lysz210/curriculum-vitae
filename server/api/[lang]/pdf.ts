import { DateTime } from 'luxon'

export default defineEventHandler( async (event) => {
    const locale = getRouterParam(event, 'lang')
    const profileURL = `https://lysz210.github.io/profile/i18n/${locale}`
    const filename = `lingyong-sun_${locale}_${ DateTime.now().setLocale('it').toFormat('yyyyMMdd-HHmmss') }.pdf`
    appendHeader(event, 'Content-Type', 'application/json')
    appendHeader(
        event,
        'Content-Disposition',
        `attachment; filename=${filename}`
    )
    return $fetch('cv.pdf', { baseURL: profileURL })
})