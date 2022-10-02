require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', (req, res) => {
  // Authenticate User
  const { id, password } = req.body
  const payload = { id: id, password: password }
  const accessToken = jwt.sign(payload, process.env.ACCESS_KEY)
  res.json({ 'accessToken': accessToken })
})

module.exports = router
