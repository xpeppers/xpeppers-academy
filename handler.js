'use strict'

const aws = require('aws-sdk')
const s3FileSystem = require('promise-filesystem')(aws.S3)

module.exports.save = (event, context) => {
  console.log(JSON.parse(event.body))
  // TODO: read body object as JSON
  // TODO: save object (validated?) to s3

  // Object to append to activities properties:
  // {"title":"Retrospettiva Trento","type":"facilitation","author":"IVO","date":"2019-03-08","links":[{"type":"wiki","url":"https://an.url"}]}

  return s3FileSystem.read('xpeppers-academy', 'data.json')
  .then((response) => {
    let data = JSON.parse((response.Body) ? response.Body.toString() : '')

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  })
}

module.exports.read = (event, context) => {
  return s3FileSystem.read('xpeppers-academy', 'data.json')
  .then((response) => {
    return {
      statusCode: 200,
      body: (response.Body) ? response.Body.toString() : '',
    }
  })
}