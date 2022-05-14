const express= require('express')
const colors= require('colors')
const config= require('dotenv').config()
const app = express()
const PORT= process.env.PORT || 8000

const server= app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`.cyan.bold.underline)
})
