
export default defineEventHandler(async event => {
    const contentCache = useStorage('cache:content')
    const keys = await contentCache.getKeys();
    const old = await contentCache.getItem('content-index.json')
    await contentCache.removeItem('content-index.json')
    return {
        new: await contentCache.getItem('content-index.json'),
        keys,
        old
    }
})