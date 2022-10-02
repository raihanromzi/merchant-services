const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// const basicAuth = require('./middleware/basic_auth')
const addMerchant = require('./routes/merchant/add_merchant')
const deleteMerchant = require('./routes/merchant/delete_merchant')
const addProduct = require('./routes/product/add_product')
const getAllProduct = require('./routes/product/get_all_product')
const updateProduct = require('./routes/product/update_product')
const deleteProduct = require('./routes/product/delete_product')
const login = require('./routes/auth/login')
const authToken = require('./middleware/jwt_auth')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// app.use(basicAuth)
app.use('/', login)
app.use(authToken)

app.use('/api', addMerchant)
app.use('/api', deleteMerchant)
app.use('/api', addProduct)
app.use('/api', deleteProduct)
app.use('/api', getAllProduct)
app.use('/api', updateProduct)

module.exports = app
