'use strict'

const aws = require('aws-sdk')
const promiseFs = require('promise-filesystem')

function fileSystem() {
  return process.env.RUN_LOCALLY === 'true' ? promiseFs() : promiseFs(aws.S3)
}

function extractData(document) {
  return (document.Body) ? document.Body.toString() : []
}

function readActivities() {
  return fileSystem().read('academy.xpeppers.com', 'data.json').then(extractData)
}

function saveActivities(data) {
  return fileSystem().write('academy.xpeppers.com', 'data.json', JSON.stringify(data))
      .then(() => '')
}

function isNot(activityToDelete) {
  return (activity) => {
    return !(activityToDelete.date === activity.date &&
          activityToDelete.author === activity.author &&
          activityToDelete.title === activity.title &&
          activityToDelete.type === activity.type)
  }
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
  return readActivities()
  .then(asJson)
  .then((data) => {
    if (!event.body) return

    data.push(JSON.parse(event.body))
    return saveActivities(data)
  })
  .then(ok)
  .catch(error)
}

module.exports.read = () => {
  return readActivities()
  .then(ok)
  .catch(error)
}

module.exports.delete = (event) => {
  return readActivities()
  .then(asJson)
  .then((data) => {
    if (!event.body) return
    let activity = JSON.parse(event.body)

    return saveActivities(data.filter(isNot(activity)))
  })
  .then(ok)
  .catch(error)
}
