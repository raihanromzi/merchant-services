const cleanObj = require('./cleanObj')

const responseSuccess = (status, message, data) => cleanObj({
  'Status': status,
  'Message': message,
  'Data': data
})

const responseError = (status, message) => cleanObj({
  status,
  message
})

module.exports = { responseSuccess, responseError }