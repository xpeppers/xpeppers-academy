'use strict'

const aws = require('aws-sdk')
const promiseFs = require('promise-filesystem')

function extractData (document) {
  return (document.Body) ? document.Body.toString() : []
}

function Repository (file) {
  const bucket = process.env.BUCKET_NAME
  const fileSystem = process.env.RUN_LOCALLY === 'true' ? promiseFs() : promiseFs(aws.S3)

  this.read = () => fileSystem.read(bucket, file).then(extractData)
  this.save = (data) => fileSystem.write(bucket, file, JSON.stringify(data)).then(() => '')
}

module.exports.Repository = Repository
