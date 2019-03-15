'use strict'

const aws = require('aws-sdk')
const s3FileSystem = require('promise-filesystem')(aws.S3)

module.exports.save = (event, context) => {
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