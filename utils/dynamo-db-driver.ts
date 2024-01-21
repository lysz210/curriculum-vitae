import { AttributeValue, DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { defineDriver } from 'unstorage'

const DRIVER_NAME = "dynamodb";



export default defineDriver((opts: any) => {
  console.log('>>>>>>> >>>>>> hello world <<<<<<<<')
  let docClient: DynamoDBDocumentClient;
  const client = () => {
    if (!docClient) {
      const client = new DynamoDBClient()
      docClient = DynamoDBDocumentClient.from(client)
    }
    return docClient
  }
  const TPL_COMMAND = {
    TableName: 'i18n.cv.lysz210'
  }
  const INDEX_NAME = 'lang-path-index'
  const cmd = {
    get (lang: string, path: string) {
      return new GetCommand({
        ...TPL_COMMAND,
        Key: {
          lang,
          path
        }
      })
    },
    getIndex (indexName: string, lang: string, path: string) {
      const command = {
        ...TPL_COMMAND,
        Key: {
          lang, path
        },
        IndexName: indexName
      }
      return new GetCommand(command)
    },
    scanIndex (indexName: string) {
      return new ScanCommand({
        ...TPL_COMMAND,
        IndexName: indexName
      })
    },
  }
  const keyParser = (key: string) => {
    console.log('keyparser', key)
    const groups = /^(?<lang>\w+)(?<path>:[\w:\-.]*\$?)$/.exec(key)?.groups
    if (!groups) {
      throw new Error('invalid key')
    }
    const lang = groups.lang
    const path = groups.path
    console.log(">>>> parsekey", lang, path)
    return {
      lang, 'path': path.replaceAll(':', '/')
    }
  }
  const keyBuilder = (index: Record<string, AttributeValue>) => `/${index.lang.S}${index.path.S}`
  return {
    name: DRIVER_NAME,
    options: opts,
    async hasItem(key) {
      console.log('>>>>>>> hasItem', key)
      const { lang, path } = keyParser(key)
      console.log(path, typeof path)
      return await client().send(cmd.getIndex(INDEX_NAME, lang, path))
        .then(response => response?.Item ? true : false)
    },
    async getItem(key) {
      console.log('>>>>>>> getItem', key)
      const { lang, path} = keyParser(key)
      console.log(path, typeof path)
      return client().send(cmd.get(lang, path))
      .then(res => {console.log(res); return res;})
        .then(response => response.Item?.content || null)
        .then(res => {console.log(res); return res;})
    },
    async setItem(key, value) {
      throw new Error('not implemented');
    },
    async removeItem(key) {
      throw new Error('not implemented');
    },
    async getKeys() {
      console.log('>>>>>>> getKeys')
      try {
        const response = await client().send(cmd.scanIndex(INDEX_NAME))
        return response?.Items?.map(keyBuilder) || []
      } catch {
        return []
      }
    },
    async getMeta(key) {
      return {
        mtime: new Date()
      };
    },
    async clear() {
      throw new Error('not implemented');
    },
  };
});