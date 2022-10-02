const express = require('express')
const db = require('../../config/db')
const response = require('../../utils/response')
const router = express.Router()

router.post('/merchant/:merchantId', (req, res) => {

  try {
    const { merchantId } = req.params
    const {
      name,
      quantity,
      price
    } = req.body

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

    if (
      !name
      || !quantity
      || !price
      || name.length < 3
      || name.length > 50
      || quantity < 1
      || price < 10000
    ) {
      res
        .status(400)
        .send(
          response
            .responseError('400 ', 'BAD_REQUEST', 'Request Body Not Correct'))
      return
    }

    if (
      typeof (name) !== 'string'
      || typeof (quantity) !== 'number'
      || typeof (price) !== 'number'
    ) {
      res
        .status(400)
        .send(
          response
            .responseError('400 ', 'BAD_REQUEST', 'Request Body Type Not Correct'))
      return
    }

    const sqlQuery =
      `INSERT INTO Product (Merchant_ID ,Name, Quantity, Price) 
       VALUES ('${merchantId}', '${name}', '${quantity}', '${price}');`

    db.query(sqlQuery, (err) => {

      if (err) {
        console.log(err)
      } else {
        res
          .status(201)
          .send(
            response
              .responseSuccess('201', 'CREATED', {
                'name': name,
                'quantity': quantity,
                'price': price
              }))
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