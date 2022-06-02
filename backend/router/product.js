const express= require('express')
const router = express.Router()
const User= require('../model/User')
const {authMiddleware} = require('../middleware/authMiddleware')
const {
  getProduct,
  getProductLatest,
  postProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateSingleProduct,
  postProductReview
} = require('../controller/productController')

router.route('/').get(getProduct).post(authMiddleware, postProduct)
router.route('/latest').get(getProductLatest)
router.route('/:id').get(getSingleProduct).put(authMiddleware, updateProduct).patch(authMiddleware, updateSingleProduct).delete(authMiddleware, deleteProduct)
router.route('/:id/review').post(authMiddleware, postProductReview)

module.exports= router
