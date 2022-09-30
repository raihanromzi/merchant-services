const express = require('express')
const db = require('../config/db')
const response = require('../utils/response')
const { nanoid } = require('nanoid')

const router = express.Router()

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

      if (results[0].length === 0) {
        res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Correct'))
        return
      }

      res.status(200).send(response.responseSuccess('200 OK', 'Success Get Product', results[0]))
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

router.put('/merchant/:merchantId/:productId', async (req, res) => {
  try {
    const { merchantId, productId } = req.params
    const { name, quantity, price } = req.body

    // Validation
    if (typeof (name) !== 'string' || typeof (quantity) !== 'number' || typeof (price) !== 'number') {
      res.status(400).send(response.responseError('400 Bad Request', 'Request Body Not Correct'))
      return
    }

    if (merchantId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Merchant ID Not Correct'))
      return
    }

    if (productId.length !== 16 || Number.isInteger(merchantId)) {
      res.status(404).send(response.responseError('404 Not Found', 'Product ID Not Correct'))
      return
    }

    // Check is Product Found
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
      const sqlQueryUpdate = `UPDATE Product SET Name='${name}', Quantity='${quantity}', Price='${price}' WHERE Product_ID='${productId}' AND Merchant_ID='${merchantId}'`
      db.query(sqlQueryUpdate)

      const sqlQueryGet = `SELECT Product_ID, Name, Quantity, Price FROM Product WHERE Merchant_ID='${merchantId}' AND Merchant_ID='${merchantId}'`
      const results = await db.promise().query(sqlQueryGet)
      res.status(200).send(response.responseSuccess('200 OK', 'Success Get Product', results[0]))
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