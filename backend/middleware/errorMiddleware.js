const ErrorMessage= require("../util/customErr")

const errorMiddleware = (err, req, res, next) =>{
  
  let error= {...err}
  error.message= err.message
  error.stack= err.stack
  error.statusCode= err.statusCode
    
  //Bad Object Id
  if(err.name=== 'CastError'){
    error= new ErrorMessage(`Could not be found with this id ~${err.value}`, 404)
  }

  //Doplicate field
  if(err.code === 11000){
    error= new ErrorMessage(`Douplicate field entering data...!`, 400)
  }

  if(err.name=== 'ValidationError'){
    const message= Object.values(err.errors).map(val => val.message)
    error= new ErrorMessage(message, 400)
  }
  
  if(err.name=== 'TypeError'){
    error= new ErrorMessage(`No item data found...!`, 404)
  }

  const statusCode= error.statusCode || 500
  const errMessage= error.message || 'Internal server error'

  res.status(statusCode).json({
    success:false,
    message: errMessage,
    stacks: process.env.NODE_ENV=== 'development' ? error.stack : null
  })

}

module.exports= errorMiddleware