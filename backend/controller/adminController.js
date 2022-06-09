const asyncHandler= require('express-async-handler')
const ErrorMessage= require('../util/customErr')
const bcryptjs= require('bcryptjs')
const User= require('../model/User')
const Product= require('../model/Product')
const Order= require("../model/Order")

const getUsers = asyncHandler(async(req, res) =>{
  
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  if(!res.advancedResult.data || res.advancedResult.data.length===0){
    throw new ErrorMessage(`User Data not found...!`, 404)
  }
  res.status(200).json(res.advancedResult)
})

const getSingleUser = asyncHandler(async(req, res) =>{

  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  const userDetail= await User.findById(req.params.id)
  if(!userDetail){
    throw new ErrorMessage(`User detail not found...!`, 404)
  }
  res.status(200).json({
    success:true,
    data: userDetail
  })
})

const updateUsers = asyncHandler(async(req, res) =>{

  const {currentPassword, newPassword}= req.body
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  const user= await User.findById(req.user.id)
  if(!user){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  const userUpdate= await User.findById(req.params.id)
  
  if(currentPassword && !newPassword){
    throw new ErrorMessage(`Please enter new password`, 400)
  }
  if(currentPassword && newPassword){
    if(!(await bcryptjs.compare(currentPassword, userUpdate.password))){
      throw new ErrorMessage(`Current password does not match`, 401)
    }
    const salt= await bcryptjs.genSalt(10)
    const hash= await bcryptjs.hash(newPassword, salt)
    userUpdate.password= hash
    await userUpdate.save()
  }
  
  const updateUser= await User.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators:true
  })
  if(!updateUser){
     throw new ErrorMessage(`Update user not found`, 400)
  }
  
  res.status(200).json({
    success:true,
    data: updateUser
  })
})

const deleteUsers = asyncHandler(async(req, res) =>{
  
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  const user= await User.findById(req.user.id)
  if(!user){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  if(!req.params.id){
    throw new ErrorMessage(`User id ~${req.params.id} not found`, 400)
  }

  const deleteUser= await User.findByIdAndDelete(req.params.id)
  if(!deleteUser){
    throw new ErrorMessage(`User data could not delete...!`, 400)
  }

  res.status(200).json({
    success:true,
    data: deleteUser
  })
})

const getProducts= asyncHandler(async(req, res) =>{

  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  if(!res.advancedResult || res.advancedResult.data.length===0){
    throw new ErrorMessage(`No data product found...!`, 404)
  }
  res.status(200).json(res.advancedResult)

})

const getProductDetail= asyncHandler(async(req, res) =>{
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }

  const product= await Product.findById(req.params.id).populate({
    path:'user',
    select: 'name email',
    model:'User'
  })
  if(!product){
    throw new ErrorMessage(`Product detail not found...!`, 404)
  }
  res.status(200).json({
    success:true,
    data: product
  })
})

const createProduct= asyncHandler(async(req, res) =>{
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  const user= await User.findById(req.user.id)
  if(!user){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  req.body.user= req.user.id
  const product= await Product.create(req.body)
  if(!product){
    throw new ErrorMessage(`Product could not be created...!`, 400)
  }
  res.status(201).json({success:true, data: product})
})

const updateProduct= asyncHandler(async(req, res) =>{
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  const product= await Product.findById(req.params.id)
  if(!product){
    throw new ErrorMessage(`Product not found...!`, 404)
  }
  const updateProduct= await Product.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators:true
  })
  if(!updateProduct){
    throw new ErrorMessage(`Update product not found...!`, 404)
  }
  res.status(200).json({success:true, data: updateProduct})
})

const deleteProducts= asyncHandler(async(req, res) =>{
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  const product= await Product.findById(req.params.id)
  if(!product){
    throw new ErrorMessage(`No product data could delete...!`, 404)
  }
  const deleteProduct= await product.remove()
  res.status(200).json({success:true, data: deleteProduct})
})

const getAllOrder= asyncHandler(async(req, res) =>{
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  if(!res.advancedResult.data || res.advancedResult.data.length===0){
    throw new ErrorMessage(`Order data not found...!`, 400)
  }
  res.status(200).json(res.advancedResult)
})

module.exports={
  getUsers,
  getSingleUser,
  updateUsers,
  deleteUsers,
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProducts,
  getAllOrder
}