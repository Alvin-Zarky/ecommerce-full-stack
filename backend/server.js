const express= require('express')
const colors= require('colors')
const config= require('dotenv').config()
const morgan= require('morgan')
const logMiddleware= require('./middleware/logMiddleware')
const app = express()
const PORT= process.env.PORT || 8000
const productRouter = require('./router/product')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//morgan middleware
// app.use(morgan('dev'))

//custom own log middleware
app.use(logMiddleware)

//route
// app.use('/mern/api/product', require('./router/product'))
app.use('/mern/api/products', productRouter)

const server= app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`.cyan.bold.underline)
})
