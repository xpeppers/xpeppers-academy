'use strict'

const { activities } = require('./lib/repositories')

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': true,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Credentials': true
}

function isNot (activityToDelete) {
  return (activity) => {
    return !(activityToDelete.date === activity.date &&
          activityToDelete.author === activity.author &&
          activityToDelete.title === activity.title &&
          activityToDelete.type === activity.type)
  }
}

function asJson (data) {
  return JSON.parse(data)
}

function error (err) {
  return { statusCode: 500, body: err, headers: HEADERS}
}

function ok (data) {
  return { statusCode: 200, body: data, headers: HEADERS}
}

module.exports.save = (event) => {
  return activities.read()
  .then(asJson)
  .then((data) => {
    if (!event.body) return

    data.push(JSON.parse(event.body))
    return activities.save(data)
  })
  .then(ok)
  .catch(error)
}

module.exports.read = () => {
  return activities.read()
  .then(ok)
  .catch(error)
}

module.exports.delete = (event) => {
  return activities.read()
  .then(asJson)
  .then((data) => {
    if (!event.body) return
    let activity = JSON.parse(event.body)

    return activities.save(data.filter(isNot(activity)))
  })
  .then(ok)
  .catch(error)
}
