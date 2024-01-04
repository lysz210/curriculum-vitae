const md5 = require('md5')
const { readFileSync } = require('fs')

console.log(md5(readFileSync('./cv-traefik.yaml')))