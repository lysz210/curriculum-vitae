import { AttributeValue, DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { defineDriver } from 'unstorage'
import _ from 'lodash'
import { DateTime } from 'luxon'
import type { S } from 'unstorage/dist/shared/unstorage.745f9650';

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
  const KEYS_INDEX_NAME = 'keys-index'
  const cmd = {
    get (locale: string, fullpath: string) {
      return new GetCommand({
        ...TPL_COMMAND,
        Key: {
          locale,
          fullpath
        }
      })
    },
    getIndex (indexName: string, locale: string, fullpath: string) {
      const command = {
        ...TPL_COMMAND,
        Key: {
          locale, fullpath
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
    const groups = /^(?<locale>\w+)(?<fullpath>:[\w:\-.]*\$?)$/.exec(key)?.groups
    if (!groups) {
      throw new Error('invalid key')
    }
    const locale = groups.locale
    const fullpath = groups.fullpath
    console.log(">>>> parsekey", locale, fullpath)
    return {
      locale, 'fullpath': fullpath.replaceAll(':', '/')
    }
  }
  const keyBuilder = (index: any) => `/${index.locale.S}${index.fullpath.S}`
  const parseToJSDate = (timestamp: string) => DateTime.fromISO(timestamp).toJSDate()
  const _getMeta = (key: string) => {
    console.log('>>>>>>> _getMeta', key)
    const { locale, fullpath } = keyParser(key)
    console.log(fullpath, typeof fullpath)
    return client().send(cmd.getIndex('metas-index', locale, fullpath))
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
      const { locale, fullpath } = keyParser(key)
      console.log(fullpath, typeof fullpath)
      return await client().send(cmd.getIndex(KEYS_INDEX_NAME, locale, fullpath))
        .then(response => response?.Item ? true : false)
    },
    async getItem(key) {
      if (key.endsWith('$')) {
        return _getMeta(_.trimEnd(key, '$'))
      }
      console.log('>>>>>>> getItem', key)
      const { locale, fullpath: pathPrefix } = keyParser(key)
      const result = await client().send(new QueryCommand({
        ...TPL_COMMAND,
        KeyConditionExpression: "locale = :locale and begins_with(fullpath, :pathPrefix)",
        ExpressionAttributeValues: {
          ":locale": locale,
          ":pathPrefix": pathPrefix
      }}))
      if (!result.Items) {
        return null
      }
      return result.Items
    },
    async getKeys() {
      console.log('>>>>>>> getKeys')
      try {
        const response = await client().send(cmd.scanIndex(KEYS_INDEX_NAME))
        return response?.Items?.map(keyBuilder) || []
      } catch {
        return []
      }
    },
    async getMeta(key) {
      console.log('>>>>>>> getMeta', key)
      return _getMeta(key)
    }
  };
});