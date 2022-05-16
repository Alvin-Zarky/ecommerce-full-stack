const asyncHandler= require('express-async-handler')

const getProduct= asyncHandler(async(req, res) =>{
  res.status(200).json({ 
    success:true,
    message: "get products"
  })
})

module.exports={
  getProduct
}