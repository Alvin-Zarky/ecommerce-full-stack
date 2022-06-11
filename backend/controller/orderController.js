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
    userName: req.user.name,
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
})

const userPayOrder = asyncHandler(async(req, res) =>{
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 400)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize...!`, 401)
  }
  
  const query= await Order.findById(req.params.id)
  if(!query){
    throw new ErrorMessage(`Order not found...!`, 400)
  }
  const order= await Order.findByIdAndUpdate(req.params.id, {
    isPaid:true,
    paidAt:Date.now(),
    paymentResult: req.body
  }, {new:true, runValidators:true})
  if(!order){
    throw new ErrorMessage(`Order update not found...!`, 400)
  }
  res.status(200).json({success:true, data: order})
    // query.isPaid= true
    // query.paidAt= Date.now()
    // query.paymentResult={
    //   id: req.body.id,
    //   status: req.body.status,
    //   email_address: req.body.payer.email_address,
    //   update_time: req.body.update_time
    // }
    // const order= await query.save()
    // res.status(200).json({
    //   success:true,
    //   data: order
    // })
})

module.exports={
    getSingleOrder,
    createOrder,
    userPayOrder
}