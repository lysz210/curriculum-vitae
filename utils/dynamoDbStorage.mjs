import { defineDriver } from 'unstorage'

const DRIVER_NAME = "dynamodb";



export default defineDriver((opts) => {
  console.log('>>>>>>> >>>>>> hello world <<<<<<<<')
  const data = new Map();
  data.set('hello.yaml', 'world')
  data.set('hello.json', 'ciao')
  return {
    name: DRIVER_NAME,
    options: opts,
    async hasItem(key) {
      console.log('>>>>>>> hasItem', key)
      return data.has(key)
    },
    async getItem(key) {

      console.log('>>>>>>> getItem', key)
      return data.get(key);
    },
    async setItem(key, value) {
      throw new Error('not implemented');
    },
    async removeItem(key) {
      throw new Error('not implemented');
    },
    async getKeys() {
      console.log('>>>>>>> getKeys')
      return ['hello.yaml', 'hello.json'];
    },
    async getMeta(key) {
      return {};
    },
    async clear() {
      throw new Error('not implemented');
    },
  };
});