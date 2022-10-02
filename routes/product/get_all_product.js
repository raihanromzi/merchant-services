const express = require('express')
const db = require('../../config/db')
const response = require('../../utils/response')

const router = express.Router()

router.get('/merchant/:merchantId', async (req, res) => {

  try {
    const { merchantId } = req.params

    if (
      merchantId.length !== 16
      || Number.isInteger(merchantId)
    ) {
      res.status(404).send(response.responseError('404', ' NOT_FOUND', 'Merchant ID Not Found'))
      return
    }

    const sqlQuery = `SELECT Product_ID, Name, Quantity, Price FROM Product WHERE Merchant_ID='${merchantId}'`
    const results = await db.promise().query(sqlQuery)

    if (results[0].length === 0) {
      res.status(404).send(response.responseError('404', ' NOT_FOUND', 'Product Not Found'))
      return
    }

    res.status(200).send(response.responseSuccess('200', 'OK', results[0]))

  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER_ERROR', 'Server Error Please Wait'))
  }
})

module.exports = router