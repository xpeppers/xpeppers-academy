'use strict'

const { Repository } = require('./lib/repository')

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

function saveTo(file, event) {
  let repository = new Repository(file)
  return repository.read()
  .then(asJson)
  .then((data) => {
    if (!event.body) return

    data.push(JSON.parse(event.body))
    return repository.save(data)
  })
  .then(ok)
  .catch(error)
}

function readFrom(file) {
  return new Repository(file).read()
  .then(ok)
  .catch(error)
}

function deleteFrom(file, event) {
  let repository = new Repository(file)
  return repository.read()
  .then(asJson)
  .then((data) => {
    if (!event.body) return
    let item = JSON.parse(event.body)

    return repository.save(data.filter(isNot(item)))
  })
  .then(ok)
  .catch(error)
}

module.exports.saveActivity = (event) => saveTo('data.json', event)
module.exports.readActivity = () => readFrom('data.json')
module.exports.deleteActivity = (event) => deleteFrom('data.json', event)

module.exports.saveLibrary = (event) => saveTo('library.json', event)
module.exports.readLibrary = () => readFrom('library.json')
module.exports.deleteLibrary = (event) => deleteFrom('library.json', event)
