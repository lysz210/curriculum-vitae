import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { defineDriver } from 'unstorage'
import _ from 'lodash'
import { DateTime } from 'luxon'

const DRIVER_NAME = "dynamodb";



export default defineDriver((opts) => {
  console.log(`>>>>>> Starting Driver dynamodb for ${opts.name} <<<<<<<<`)
  let docClient;
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
    get (lang, path) {
      return new GetCommand({
        ...TPL_COMMAND,
        Key: {
          lang,
          path
        }
      })
    },
    getIndex (indexName, lang, path) {
      const command = {
        ...TPL_COMMAND,
        Key: {
          lang, path
        },
        IndexName: indexName
      }
      return new GetCommand(command)
    },
    scanIndex (indexName) {
      return new ScanCommand({
        ...TPL_COMMAND,
        IndexName: indexName
      })
    },
  }
  const keyParser = (key) => {
    console.log('keyparser', key)
    const groups = /^(?<lang>\w+)(?<path>:[\w:\-.]*)$/.exec(key)?.groups
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
  const keyBuilder = (index) => `/${index.lang.S}${index.path.S}`
  const parseToJSDate = (timestamp) => DateTime.fromISO(timestamp).toJSDate()
  const _getMeta = (key) => {
    console.log('>>>>>>> _getMeta', key)
    const { lang, path } = keyParser(key)
    console.log(path, typeof path)
    return client().send(cmd.getIndex('meta-index', lang, path))
      .then(response => response?.Item)
      .then(meta => {
        return meta
          ? ({ mtime: parseToJSDate(meta.mtime), birthtime: parseToJSDate(meta.birthtime) })
          : { mtime: DateTime.now().toJSDate() }
      })
  }
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
      if (key.endsWith('$')) {
        return _getMeta(_.trimEnd(key, '$'))
      }
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
      console.log('>>>>>>> getMeta', key)
      return _getMeta(key)
    },
    async clear() {
      throw new Error('not implemented');
    },
  };
});