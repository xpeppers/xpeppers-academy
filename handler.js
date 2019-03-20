'use strict'

const aws = require('aws-sdk')
const promiseFs = require('promise-filesystem')

function fileSystem() {
  return process.env.RUN_LOCALLY === 'true' ? promiseFs() : promiseFs(aws.s3)
}

module.exports.save = (event, context) => {
  const fs = fileSystem()

  // TODO: read body object as JSON
  // TODO: save object (validated?) to s3

  // Object to append to activities properties:
  // {"title":"Retrospettiva Trento","type":"facilitation","author":"IVO","date":"2019-03-08","links":[{"type":"wiki","url":"https://an.url"}]}

  return fs.read('academy.xpeppers.com', 'data.json')
  .then((response) => {
    let data = JSON.parse((response.Body) ? response.Body.toString() : '')

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  })
  .catch(console.log)
}

module.exports.read = (event, context) => {
  const fs = fileSystem()

  return fs.read('academy.xpeppers.com', 'data.json')
  .then((response) => {
    return {
      statusCode: 200,
      body: (response.Body) ? response.Body.toString() : '',
    }
  })
  .catch(console.log)
}