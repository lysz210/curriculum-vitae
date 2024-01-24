export default defineEventHandler((event) => {
    return useStorage().getKeys()
} )