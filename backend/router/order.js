const express= require('express')
const router= express.Router()
const {
    getSingleOrder,
    createOrder
} = require('../controller/orderController')
const {authMiddleware} = require("../middleware/authMiddleware")

router.route('/').post(authMiddleware, createOrder)
router.route('/:id').get(authMiddleware, getSingleOrder)

module.exports= router