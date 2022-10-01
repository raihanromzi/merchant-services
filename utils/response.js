const cleanObj = require('./cleanObj')

const responseSuccess = (status, message, data) => cleanObj({
  'status': status,
  'message': message,
  'data': data
})

const responseError = (status, message) => cleanObj({
  'status': status,
  'message': message,
})

module.exports = { responseSuccess, responseError }