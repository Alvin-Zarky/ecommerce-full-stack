const express= require('express')
const router= express.Router()
const {
    getSingleOrder,
    createOrder,
    userPayOrder
} = require('../controller/orderController')
const {authMiddleware} = require("../middleware/authMiddleware")

router.route('/').post(authMiddleware, createOrder)
router.route('/:id').get(authMiddleware, getSingleOrder)
router.route('/:id/pay').put(authMiddleware, userPayOrder)
module.exports= router