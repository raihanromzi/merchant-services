const express = require('express')
const db = require('../config/db')
const response = require('../utils/response')
const router = express.Router()

router.delete('/merchant/:merchantId', async (req, res) => {
  try {
    const { merchantId } = req.params

    //Validation
    if (merchantId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Found'))
      return
    }

    // Check if Merchant is Found
    try {
      const sqlQuery = `SELECT * FROM Merchant WHERE Merchant_ID='${merchantId}'`
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
      const sqlQuery = `DELETE FROM Merchant WHERE Merchant_ID='${merchantId}'`
      db.query(sqlQuery)
      res.status(200).send(response.responseSuccess('200 OK', 'Success Delete Merchant'))
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
