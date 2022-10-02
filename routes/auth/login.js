require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const response = require('../../utils/response')
const db = require('../../config/db')

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body

    const sqlQuery = `SELECT * FROM Merchant WHERE Merchant_ID="${id}"`
    const result = await db.promise().query(sqlQuery)
    
    if (result[0].length === 0) {
      res.status(404).send(response.responseError('404', ' NOT_FOUND', 'User Not Found'))
      return
    }


    // Authenticate User
    const payload = { id: id, password: password }
    const accessToken = jwt.sign(payload, process.env.ACCESS_KEY)
    res.json({ 'accessToken': accessToken })
  } catch (e) {
    res.status(500).send(response.responseError('500', 'SERVER_ERROR', 'Server Error Please Wait'))
  }
})

module.exports = router
