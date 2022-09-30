const express = require('express')
const db = require('../../config/db')
const response = require('../../utils/response')
const { nanoid } = require('nanoid')

const router = express.Router()

router.delete('/merchant/:merchantId/:productId', async (req, res) => {
  try {
    const { merchantId, productId } = req.params

    // Validation
    if (productId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Product ID Not Correct'))
      return
    }

    if (merchantId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Correct'))
      return
    }

    try {
      const sqlQuery = `SELECT * FROM Product WHERE Product_ID='${productId}' AND Merchant_ID='${merchantId}'`
      const result = await db.promise().query(sqlQuery)

      if (result[0].length === 0) {
        res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Correct'))
        return
      }

    } catch (e) {
      res.status(500).send(response.responseError('500 Server Error', 'Server Error Please Wait'))
      return
    }

    try {
      const sqlQuery = `DELETE FROM Product WHERE Merchant_ID='${merchantId}' AND Merchant_ID='${merchantId}'`
      db.query(sqlQuery)
      res.status(200).send(response.responseSuccess('200 OK', 'Success Delete Product'))
      return

    } catch (e) {
      res.status(500).send(response.responseError('500 Server Error', 'Server Error Please Wait'))
      return
    }

  } catch (e) {
    res.status(500).send(response.responseError('500 Server Error', 'Server Error Please Wait'))
    return
  }
})

module.exports = router