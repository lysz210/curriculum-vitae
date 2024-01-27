import dynamoDbDriver from "~/utils/dynamo-db-driver"

export default defineNitroPlugin(() => {
    const storage = useStorage()
    storage.mount('i18n', dynamoDbDriver({}))
})