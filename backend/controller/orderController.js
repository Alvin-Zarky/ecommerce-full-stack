const asyncHandler= require('express-async-handler')

const getOrder = asyncHandler(async(req, res) =>{
    res.status(200).json({
        success:true,
        message: "get orders"
    })
})

module.exports={
    getOrder
}