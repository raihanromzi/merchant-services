const express = require('express')
const db = require('../config/db')
const response = require('../utils/response')
const { nanoid } = require('nanoid')

const router = express.Router()


router.get('/merchant/:merchantId', async (req, res) => {
  try {
    const { merchantId } = req.params

    //Validation
    if (merchantId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Found'))
      return
    }

    try {
      const sqlQuery = `SELECT Product_ID, Name, Quantity, Price FROM Product WHERE Merchant_ID='${merchantId}'`
      const results = await db.promise().query(sqlQuery)
      res.status(200).send(response.responseSuccess('200 OK', 'Success Get Product', results[0]))

    } catch (e) {
      res.status(500).send(response.responseError('500 Server Error', 'Server Error Please Wait'))
      return
    }

  } catch (e) {
    res.status(500).send(response.responseError('500 Server Error', 'Server Error Please Wait'))
    return
  }
})

router.post('/merchant/:merchantId', (req, res) => {
  try {
    const { merchantId } = req.params
    const { name, quantity, price } = req.body
    const productId = nanoid(16)

    //Validation
    if (merchantId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Found'))
      return
    }

    if (!name || !quantity || !price) {
      res.status(400).send(response.responseError('400 Bad Request', 'Request Body Not Correct'))
      return
    }

    if (typeof (name) !== 'string' || typeof (quantity) !== 'number' || typeof (price) !== 'number') {
      res.status(400).send(response.responseError('400 Bad Request', 'Request Body Not Correct'))
      return
    }

    try {
      const sqlQuery = `INSERT INTO Product (Product_ID, Merchant_ID ,Name, Quantity, Price) VALUES ('${productId}', '${merchantId}', '${name}', '${quantity}', '${price}');`
      db.query(sqlQuery)
      res.status(201).send(response.responseSuccess('201 Created', '', {
        'name': name,
        'quantity': quantity,
        'price': price
      }))
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