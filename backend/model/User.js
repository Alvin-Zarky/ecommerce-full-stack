const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [4, 'Name should be atleast 4 characters'],
        maxLength: [10, `Name shouldn't be more than 10 characters`]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:[6, 'Password should be atleast 6 characters']
    },
    isAdmin:{
        type:Boolean,
        enum:[true, false],
        default:false
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default: 'user',
        required:true
    }
}, {timestamps: true})


module.exports= mongoose.model('User', userSchema)