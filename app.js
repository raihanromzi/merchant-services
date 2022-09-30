const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const productsRouter = require('./routes/product')
const addMerchant = require('./routes/addMerchant')
const deleteMerchant = require('./routes/deleteMerchant')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', addMerchant)
app.use('/api', deleteMerchant)
app.use('/api', productsRouter)


module.exports = app
