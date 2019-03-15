'use strict'

const data = require('./data.json')

module.exports.save = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }

  callback(null, response)
}