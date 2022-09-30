const cleanObj = require('./cleanObj')

const responseSuccess = (status, message, data) => cleanObj({
  status,
  message,
  data
})

const responseError = (status, message) => cleanObj({
  status,
  message
})

module.exports = { responseSuccess, responseError }