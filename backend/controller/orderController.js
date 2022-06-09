const asyncHandler= require('express-async-handler')
const ErrorMessage= require("../util/customErr")
const Order= require("../model/Order")

const getSingleOrder = asyncHandler(async(req, res) =>{
  
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  const order= await Order.findById(req.params.id)
  if(!order){
    throw new ErrorMessage(`Order not found...!`, 400)
  }
  res.status(200).json({
    success:true,
    data: order
  })
})

const createOrder = asyncHandler(async(req, res) =>{
  
  const {orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice}= req.body
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }

  const order= new Order({
    user:req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice
  })
  const orderResult= await order.save()
  res.status(201).json({
    success:true,
    data: orderResult
  })
  
  // const orderResult= await Order.create({
    //   user:req.user._id,
    //   orderItems,
    //   shippingAddress,
    //   paymentMethod,
    //   taxPrice,
    //   shippingPrice,
    //   totalPrice
    // })
    // if(!orderResult){
    //   throw new ErrorMessage(`Order does not created...!`, 400)
    // }
})

module.exports={
    getSingleOrder,
    createOrder
}