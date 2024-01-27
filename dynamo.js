import { AttributeValue, DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, BatchWriteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { readdir, readFile, stat } from 'node:fs/promises'
import { resolve, dirname } from "path";
import { parseFrontMatter } from 'remark-mdc'
import _ from 'lodash'

async function readdirRecursive(dir, ignore) {
    if (ignore && ignore(dir)) {
      return [];
    }
    const entries = await readdir(dir, {withFileTypes: true });
    const files = [];
    await Promise.all(
      entries.map(async (entry) => {
        const entryPath = resolve(dir, entry.name);
        if (entry.isDirectory()) {
          const dirFiles = await readdirRecursive(entryPath, ignore);
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        } else {
          if (!(ignore && ignore(entry.name))) {
            files.push(entry.name);
          }
        }
      })
    );
    return files;
  }
async function main () {
    const client = new DynamoDBClient()
    const docClient = DynamoDBDocumentClient.from(client)

    // const response = []

    // const files = await readdirRecursive('./content/lang/')

    // for (let file of files) {
    //     if (file.includes('it-skills.yaml')) continue
    //     const filename = './content/lang/' + file;
    //     const key = /(?<locale>en|it)(?<fullpath>.*)/.exec(file).groups
    //     const { mtime, birthtime } = await stat(filename)
    //     const content = await readFile(filename, 'utf-8')
    //     const { data} = parseFrontMatter(`---\n${content}\n---`)
    //     const Item = {
    //         ...key,
    //         ...data,
    //         mtime: mtime.toISOString(),
    //         birthtime: birthtime.toISOString()
    //     }

    //     console.log(Item)
    //     response.push({
    //         PutRequest: {
    //             Item
    //         }
    //     })
    // }

    // for (let chunk of _.chunk(response, 25)) {
    //     const batchCmd = new BatchWriteCommand({
    //         RequestItems: {
    //             'i18n.cv.lysz210': chunk
    //         }
    //     })
    //     const res = await docClient.send(batchCmd);
    //     console.log(res)
    // }

    // return response

    // const cmd = new PutCommand({
    //     TableName: 'i18n.cv.lysz210',
    //     Key: {
    //         lang: 'en',
    //     }
    // })

    return docClient.send(new QueryCommand({
        TableName: 'i18n.cv.lysz210',
        KeyConditionExpression: "locale = :en or locale = :it",
        // FilterExpression: "attribute_exists(mtime)",
        ExpressionAttributeValues: {
            ":en": "en",
            ":it": "it"
            // ":prefix": "/"
        }
    }))
}

main()
.then(data => JSON.stringify(data, null, 4))
.then(console.log)