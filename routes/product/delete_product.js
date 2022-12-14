const express = require('express')
const db = require('../../config/db')
const response = require('../../utils/response')

const router = express.Router()

router.delete('/merchant/:merchantId/:productId', async (req, res) => {

  try {
    const {
      merchantId,
      productId
    } = req.params

    if (
      merchantId.length !== 16
      || Number.isInteger(merchantId)
    ) {
      res
        .status(404)
        .send(
          response
            .responseError('404', ' NOT_FOUND', 'Merchant ID Not Correct'))
      return
    }

    try {
      const sqlQuery =
        `SELECT * 
         FROM Product 
         WHERE Product_ID='${productId}' 
         AND Merchant_ID='${merchantId}'`

      const result = await db.promise().query(sqlQuery)

      if (result[0].length === 0) {
        res
          .status(404)
          .send(
            response
              .responseError('404', ' NOT_FOUND', 'Product Not Found'))
        return
      }

    } catch (e) {
      res
        .status(500)
        .send(
          response
            .responseError('500', 'SERVER_ERROR', 'Server Error Please Wait'))
      return
    }

    const sqlQuery =
      `DELETE 
       FROM Product 
       WHERE Merchant_ID='${merchantId}' 
       AND Product_ID='${productId}'`

    db.query(sqlQuery, (err) => {

      if (err) {
        console.log(err)
      } else {
        res.status(200)
          .send(
            response
              .responseSuccess('200', 'OK', 'Success Delete Product'))
      }
    })

  } catch (e) {
    res
      .status(500)
      .send(
        response
          .responseError('500', 'SERVER_ERROR', 'Server Error Please Wait'))
  }

})

module.exports = router