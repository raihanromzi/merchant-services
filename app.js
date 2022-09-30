const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const addMerchant = require('./routes/addMerchant')
const deleteMerchant = require('./routes/deleteMerchant')
const addProduct = require('./routes/addProduct')
const getAllProduct = require('./routes/getAllProduct')
const updateProduct = require('./routes/updateProduct')
const deleteProduct = require('./routes/deleteProduct')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', addMerchant)

app.use('/api', deleteMerchant)
app.use('/api', addProduct)
app.use('/api', getAllProduct)
app.use('/api', updateProduct)
app.use('/api', deleteProduct)

module.exports = app
