const express = require('express')
const db = require('../../config/db')
const response = require('../../utils/response')

const router = express.Router()

router.put('/merchant/:merchantId/:productId', async (req, res) => {

  try {
    const {
      merchantId,
      productId
    } = req.params

    const {
      name,
      quantity,
      price
    } = req.body

    if (
      typeof (name) !== 'string'
      || typeof (quantity) !== 'number'
      || typeof (price) !== 'number'
      || name.length < 3
      || name.length > 50
      || quantity < 1
      || price < 10000
    ) {
      res
        .status(400)
        .send(
          response
            .responseError('400', 'BAD_REQUEST', 'Request Body Not Correct'))
      return
    }

    if (
      Number.isInteger(merchantId)
      || merchantId.length !== 16
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

    const sqlQueryUpdate =
      `UPDATE Product 
       SET Name='${name}', Quantity='${quantity}', Price='${price}' 
       WHERE Product_ID='${productId}' 
       AND Merchant_ID='${merchantId}'`

    db.query(sqlQueryUpdate, (err) => {
      if (err) {
        console.log(err)
      }
    })


    const sqlQueryGet =
      `SELECT Product_ID, Name, Quantity, Price 
       FROM Product 
       WHERE Merchant_ID='${merchantId}' 
       AND Merchant_ID='${merchantId}'`

    const results = await db.promise().query(sqlQueryGet)

    if (results[0].length === 0) {
      res
        .status(404)
        .send(
          response
            .responseError('404', ' NOT_FOUND', 'Product Not Found'))
      return
    }

    res
      .status(200)
      .send(
        response
          .responseSuccess('200', 'OK', results[0]))

  } catch (e) {
    res
      .status(500)
      .send(
        response
          .responseError('500', 'SERVER_ERROR', 'Server Error Please Wait'))
  }

})

module.exports = router