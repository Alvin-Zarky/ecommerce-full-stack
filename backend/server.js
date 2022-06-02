const express= require('express')
const colors= require('colors')
const config= require('dotenv').config()
const morgan= require('morgan')
const logMiddleware= require('./middleware/logMiddleware')
const errorMiddleware= require('./middleware/errorMiddleware')
const app = express()
const connectDb= require('./database/mongoDb')
const PORT= process.env.PORT || 8000
const productRouter = require('./router/product')
const userRouter = require('./router/user')
const orderRouter= require('./router/order')
const adminRouter = require('./router/admin')

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//morgan middleware
// app.use(morgan('dev'))

//custom own log middleware
app.use(logMiddleware)

//route
// app.use('/mern/api/product', require('./router/product'))
app.get('/mern/api', async(req, res) =>{
  res.send(`Server API is running...!`)
})

app.use('/mern/api/product', productRouter)
app.use('/mern/api/user', userRouter)
app.use('/mern/api/order', orderRouter)
app.use('/mern/api/admin', adminRouter)

app.use((req, res, next) =>{
  res.status(404).json({
    message: `Page not found ~ ${req.originalUrl}`
  })
})

app.use(errorMiddleware)

app.listen(PORT, () =>{
  console.log(`Server in ${process.env.NODE_ENV} mode is running on port ${PORT}`.cyan.bold.underline)
})

// process.on('rejectionHandled', (err, promise) =>{
//   console.log(`error connection ${err.message}`.red.bold.underline)
//   server.on('close', () => process.exit(1))
// })
