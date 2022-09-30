const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const addMerchant = require('./routes/merchant/addMerchant')
const deleteMerchant = require('./routes/merchant/deleteMerchant')
const addProduct = require('./routes/product/addProduct')
const getAllProduct = require('./routes/product/getAllProduct')
const updateProduct = require('./routes/product/updateProduct')
const deleteProduct = require('./routes/product/deleteProduct')

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
