const jwt= require('jsonwebtoken')
const asyncHandler= require('express-async-handler')
const User= require('../model/User')
const ErrorMessage = require('../util/customErr')

const authMiddleware= asyncHandler(async (req, res, next) =>{
  let token

  try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    
      token= req.headers.authorization.split(" ")[1]
      const decoded= jwt.verify(token, process.env.JWT_SECRET)
      const user= await User.findById(decoded.id).select('-password')
      req.user = user
    }
  }catch(err){
    throw new ErrorMessage(`Not Authorize...!`, 401)
  }

  if(!token){
    throw new ErrorMessage(`No Auth Token...!`, 401)
  }

  next()
})

const roleUser = (...roles) => (req, res, next) =>{
  if(!roles.includes(req.user.role)){
    throw new ErrorMessage(`User role not authorize as an admin...!`, 401)
  }
  next()
}

const roleUserPermission = (...roles) =>{
  return (req, res, next) =>{
    if(!roles.includes(req.user.role)){
      throw new ErrorMessage(`User role not authorize as an admin...!`, 401)
    }
    next()
  }
}

module.exports= {authMiddleware, roleUser}