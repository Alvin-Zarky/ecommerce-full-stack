
const advancedResultMiddleware= (model, populate) => async(req, res, next) =>{
  
  let data = model.find()
  let count= model.countDocuments()
  if(req.query){
    data= model.find(req.query)
  }
  if(req.query.keyword){
    const keyword= {
      name:{
        $regex: req.query.keyword,
        $options: `i`
      }
    }
    data= model.find({...keyword})
    count= model.countDocuments({...keyword})
  }
  if(populate){
    data.populate(populate)
  }
  if(req.query.select){
    const select= req.query.select.split(',').join(' ')
    data.select(select)
  }
  if(req.query.sort){
    const sort= req.query.sort.split(',').join(' ')
    data.sort(sort)
  }
  data.sort({createdAt: -1})
  
  const pagination={}
  const pages= parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const countAll= await count
  const start= (pages - 1) * limit
  const end= pages * limit
  data.skip(start).limit(limit)
  const result= await data

  if(start > 0){
    pagination.prev={
      page: pages- 1,
      limit
    }
  }
  if(end < countAll){
    pagination.next={
      page: pages+ 1,
      limit
    }
  }

  res.advancedResult={
    success:true,
    count: countAll,
    pagination,
    data: result
  }

  next()
}

module.exports= advancedResultMiddleware