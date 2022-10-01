const express = require('express')
const auth = require('basic-auth')
const response = require('../utils/response')

const app = express()

app.use((req, res, next) => {
  const credentials = auth(req)

  if (
    !credentials
    || !(credentials.name === process.env.AUTH_USERNAME)
    || !(credentials.pass === process.env.AUTH_PASSWORD)
  ) {
    res.status(401).setHeader('WWW-Authenticate', 'Basic')
    res.send(response.responseError(401, 'UNAUTHORIZED', 'Access Denied'))
  } else {
    next()
  }
})

module.exports = app