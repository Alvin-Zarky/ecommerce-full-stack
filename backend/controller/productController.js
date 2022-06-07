const asyncHandler= require('express-async-handler')
const Product= require('../model/Product')
const ErrorMessage= require('../util/customErr')

const getProduct= asyncHandler(async(req, res) =>{

  let query
  let count= await Product.countDocuments({})
  if(req.query){
    query= Product.find(req.query)
  }
  if(req.query.keyword){
    const keyword= req.query.keyword ? {
      name:{
        $regex: req.query.keyword, // search for like sth
        $options: `i` // lowercase or uppercase it's fine
      } 
    } : {}
    count= await Product.countDocuments({ ...keyword })
    query= Product.find({...keyword})
  }
  const productQuery= query.populate({
    path:'user',
    select:'name email',
    model:'User'
  })
  
  if(req.query.select){
    const querySelect= req.query.select.split(',').join(' ')
    productQuery.select(querySelect)
  }
  if(req.query.sort){
    const querySort= req.query.sort.split(',').join(' ')
    productQuery.sort(querySort)
  }
  
  const limit= 8
  const pagination={}
  const page= Number(req.query.page) || 1
  const startPage= (page - 1) * limit
  const pages= Math.ceil(count / limit)
  const endPage= page * limit

  if(startPage > 0){
    pagination.prev={
      page: page - 1
    }
  }
  if(endPage < count){
    pagination.next={
      page: page + 1
    }
  }

  productQuery.sort({createdAt:-1})
  const products= await productQuery.skip(startPage).limit(limit)
  
  if(!products || products.length===0){
    throw new ErrorMessage(`Product not found...!`, 404)
  }
  
  res.status(200).json({ 
    success:true,
    pagination,
    count,
    page,
    pages,
    data: products
  })

})

const getProductLatest= asyncHandler(async(req, res) =>{

  const productQuery= Product.find(req.query).populate({
    path:'user',
    select:'name email',
    model:'User'
  })
  
  if(req.query.select){
    const querySelect= req.query.select.split(',').join(' ')
    productQuery.select(querySelect)
  }
  if(req.query.sort){
    const querySort= req.query.sort.split(',').join(' ')
    productQuery.sort(querySort)
  }

  productQuery.sort({createdAt:-1}).limit(3)
  const products= await productQuery
  
  if(!products || products.length===0){
    throw new ErrorMessage(`Product not found...!`, 404)
  }
  
  res.status(200).json({ 
    success:true,
    count: products.length,
    data: products
  })

})

const postProduct= asyncHandler(async(req, res) =>{

  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 401)
  }
  if(!req.user.id){
    throw new ErrorMessage(`User not authorize completely...!`, 401)
  }

  req.body.user= req.user._id
  const products= await Product.create(req.body)
  if(!products){
    throw new ErrorMessage(`Product created not found...!`, 400)
  }

  res.status(201).json({ 
    success:true,
    data: products
  })
})

const getSingleProduct= asyncHandler(async(req, res) =>{

  const products= await Product.findById(req.params.id).populate({
    path:'user',
    select:'name email',
    model:'User'
  })

  if(!products || products.length===0){
    throw new ErrorMessage(`Single Product not found...!`, 404)
  }

  res.status(200).json({ 
    success:true,
    data: products
  })

})

const updateProduct= asyncHandler(async(req, res) =>{
  
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 401)
  }
  if(!req.params.id){
    throw new ErrorMessage(`Product id not found...!`, 404)
  }

  const products= await Product.findById(req.params.id)
  
  if(!products || products.length===0){
    throw new ErrorMessage(`Product not found..!`, 404)
  }
  if(req.user.id !== products.user.toString()){
    throw new ErrorMessage(`User not authorize completely...!`, 401)
  }
  
  const updateProduct= await Product.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators:true
  })

  res.status(200).json({
    success:true,
    data: updateProduct
  })

})

const deleteProduct= asyncHandler(async(req, res) =>{
  
  if(!req.user){
    throw new ErrorMessage(`User does not exist...!`, 401)
  }

  const products= await Product.findById(req.params.id)

  if(!products){
    throw new ErrorMessage(`Product not found...!`, 404)
  }

  if(req.user.id !== products.user.toString()){
    throw new ErrorMessage(`User not authorize completely...!`, 401)
  }

  const deleteProduct= await Product.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success:true,
    data: deleteProduct
  })
})

const postProductReview = asyncHandler(async(req, res) =>{
  
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

  const reviewProduct= product.review.find(val =>{
    return val.user.toString() === req.user._id.toString()
  })
  if(reviewProduct){
    throw new ErrorMessage(`Product already reviewed...!`, 400)
  }
  const reviews={
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comments: req.body.comments
  }
  product.review.push(reviews)
  
  product.numReviews= product.review.length
  product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length 

  const infoProduct= await product.save()
  
  res.status(201).json({success:true, data:infoProduct})
})

const updateSingleProduct= asyncHandler(async(req, res) =>{
  res.status(200).json({
    success:true,
    message: "update single product"
  })
})

module.exports={
  getProduct,
  getProductLatest,
  getSingleProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  updateSingleProduct,
  postProductReview
}