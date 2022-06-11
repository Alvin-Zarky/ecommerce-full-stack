const express= require('express')
const router= express.Router()
const User= require('../model/User')
const Product = require('../model/Product')
const Order = require("../model/Order")
const {authMiddleware, roleUser}= require('../middleware/authMiddleware')
const advancedResultMiddleware= require('../middleware/advancedResult')
const {
  getUsers,
  getSingleUser,
  updateUsers,
  deleteUsers,
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProducts,
  getAllOrder,
  markUserOrder
} = require('../controller/adminController')

router.use(authMiddleware)
router.use(roleUser('admin'))

router.route('/user').get(advancedResultMiddleware(User), getUsers)
router.route('/user/:id').get(getSingleUser).put(updateUsers).delete(deleteUsers)

router.route('/product').get(advancedResultMiddleware(Product, {
  path:'user',
  select:'name email',
  model:'User'
}), getProducts).post(createProduct)
router.route('/product/:id').get(getProductDetail).put(updateProduct).delete(deleteProducts)

router.route('/order').get(advancedResultMiddleware(Order, {
  path:'user',
  model:'User',
  select:'name email'
}) ,getAllOrder)
router.route('/order/:id/delivered').put(markUserOrder)

module.exports= router