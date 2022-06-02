const express= require('express')
const router= express.Router()
const User= require('../model/User')
const Product = require('../model/Product')
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
  deleteProducts
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

module.exports= router