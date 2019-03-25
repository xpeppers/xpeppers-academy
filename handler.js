'use strict'

const aws = require('aws-sdk')
const promiseFs = require('promise-filesystem')

function fileSystem() {
  return process.env.RUN_LOCALLY === 'true' ? promiseFs() : promiseFs(aws.S3)
}

function extractData(document) {
  return (document.Body) ? document.Body.toString() : []
}

function readFile() {
  return fileSystem().read('academy.xpeppers.com', 'data.json').then(extractData)
}

function asJson(data) {
  return JSON.parse(data)
}

function error(err) {
  return { statusCode: 500, body: err, headers: { 'Access-Control-Allow-Origin': '*' }}
}

function ok(data) {
  return { statusCode: 200, body: data, headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': true,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': true
  }}
}

module.exports.save = (event) => {
  return readFile()
  .then(asJson)
  .then((data) => {
    if (!event.body) return

    data.push(JSON.parse(event.body))
    return fileSystem().write('academy.xpeppers.com', 'data.json', JSON.stringify(data))
      .then(() => '')
  })
  .then(ok)
  .catch(error)
}

module.exports.read = () => {
  return readFile()
  .then(ok)
  .catch(error)
}
