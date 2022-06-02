const fs= require('fs')
const colors= require('colors')
const products= require('./_data/product')
const users= require('./_data/user')
const Product= require('./model/Product')
const User= require('./model/User')
const Order= require('./model/Order')
const mongoose= require('mongoose')
const dotenv= require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

// const productsJson= JSON.parse(fs.readFileSync(`${__dirname}/_data/product.json`, 'utf-8'))
// const usersJson= JSON.parse(fs.readFileSync(`${__dirname}/_data/user.json`, 'utf-8'))

const importData = async () =>{
    console.log('Loading...!'.cyan.bold.underline)
    try{
        // await Product.create(productsJson)
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        const userDoc= await User.insertMany(users)
        const productData= products.map(product =>{
            return {
                ...product,
                user: userDoc[0]._id
            }
        })
        await Product.insertMany(productData)
        console.log(`Import Data Successfully...!`.green.bold.inverse)
        process.exit()
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

const exportData= async() =>{
    console.log('Loading...!'.cyan.bold.underline)
    try{
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()
        console.log(`Destroy Data Successfully...!`.red.bold.inverse)
        process.exit()
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

if(process.argv[2] === '-i'){
    importData()
}else{
    exportData()
}

