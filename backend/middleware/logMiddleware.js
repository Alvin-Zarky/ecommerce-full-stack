const colors= require('colors')

const logMiddleware = (req, res, next) =>{
  
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.url} ${req.get('connection')}`.yellow.bold)
  next()
}

module.exports= logMiddleware