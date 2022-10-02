const express = require('express')
const db = require('../../config/db')
const response = require('../../utils/response')
const { nanoid } = require('nanoid')
const router = express.Router()

router.post('/merchant', (req, res) => {

  try {
    const {
      password,
      name,
      address,
      phone_number
    } = req.body
    const id = nanoid(16)

    if (
      !password
      || !name
      || !address
      || !phone_number
      || password.length < 6
      || name.length < 3
      || name.length > 50
    ) {
      res
        .status(400)
        .send(
          response
            .responseError('400 ', 'BAD_REQUEST', 'Request Body Not Correct'))
      return
    }

    if (
      typeof (password) !== 'string'
      || typeof (name) !== 'string'
      || typeof (address) !== 'string'
      || typeof (phone_number) !== 'string'
    ) {
      res
        .status(400)
        .send(
          response
            .responseError('400 ', 'BAD_REQUEST', 'Request Body Not Correct'))
      return
    }

    const sqlQuery =
      `INSERT INTO Merchant (Merchant_ID, Password, Name, Address, Phone_number) 
       VALUES ('${id}', '${password}', '${name}', '${address}', '${phone_number}');`

    db.query(sqlQuery, (err) => {

      if (err) {
        console.log(err)
      } else {
        res
          .status(201)
          .send(
            response
              .responseSuccess('201', 'CREATED', {
                'id': id,
                'password': password,
                'name': name,
                'address': address,
                'phone_number': phone_number
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