import * as puppeteer from 'puppeteer'
import { DateTime } from 'luxon'

export default defineEventHandler( async event => {
    const browser = await puppeteer.launch({ headless: true })

    const page = await browser.newPage()
    await page.goto('http://localhost:3000/en/pdf', 
    { waitUntil: 'networkidle0' })

    await page.waitForFunction('window.pdfReady === true')

    const pdf = await page.pdf({ format: 'A4' })

    appendHeader(event, 'Content-Type', 'application/json')

    appendHeader(event, 'Content-Disposition', `attachment; filename=lingyong-sun${ DateTime.now().setLocale('it').toFormat('yyyyMMdd-HHmmss') }.pdf`)

    return pdf
})