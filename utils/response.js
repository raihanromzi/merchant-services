const cleanObj = require('./cleanObj')

const responseSuccess = (code, status, data) => cleanObj({
  'code': code,
  'status': status,
  'data': [
    data
  ]
})

const responseError = (code, status, error) => cleanObj({
  'code': code,
  'status': status,
  'errors': error,
})

module.exports = { responseSuccess, responseError }