const mongoose= require('mongoose')

const reviewSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comments:{
        type:String,
        required:true,
        minLength:[3, 'Comments shoudl be atleast more than 3 characters']
    }
}, {timestamps:true})

const productSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxLength:200,
        required:true
    },
    rating:{
        type:Number,
        default:0.0,
        required:true
    },
    numReviews:{
        type:Number,
        required:true,
        default: 0
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    review: [reviewSchema]
}, {timestamps:true})

module.exports= mongoose.model('Product', productSchema)