const express= require('express')
const router= express.Router()
const {
    getOrder
} = require('../controller/orderController')

router.route('/').get(getOrder)

module.exports= router