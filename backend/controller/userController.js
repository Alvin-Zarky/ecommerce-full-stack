const asyncHandler= require('express-async-handler')
const User = require('../model/User')
const bcryptjs= require('bcryptjs')
const ErrorMessage = require('../util/customErr')
const jwt= require('jsonwebtoken')

const getUser= asyncHandler(async(req, res) =>{

    if(!req.user){
        throw new ErrorMessage(`User does not exist...!`, 401)
    }
    if(!req.user.id){
        throw new ErrorMessage(`User not authorize...!`, 401)
    }

    const user= await User.findById(req.user.id).select('-password')
    if(!user){
        throw new ErrorMessage(`User not authorize`, 401)
    }

    res.status(200).json({
        success:true,
        data: user
    })
})

const registerUser= asyncHandler(async(req, res) =>{
    
    const { name, email, password } = req.body
    if(!password || !name || !email){
        throw new ErrorMessage(`Please input the field..!`, 400)
    }

    const userEmail= await User.findOne({email})
    if(userEmail){
        throw new ErrorMessage(`User email is already exist...!`, 401)
    }
    
    const hash= await bcryptjs.genSalt(10)
    const hashPassword= await bcryptjs.hash(password, hash)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        isAdmin: false,
        role:'user'
    })
    if(!user){
        throw new ErrorMessage(`User created not found...!`, 401)
    }

    res.status(201).json({
        success:true,
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            role:user.role,
            token:generateToken(user._id)
        }
    })

})

const logInUser= asyncHandler(async(req, res) =>{
    
    const { email, password } = req.body
    if(!email || !password){
        throw new ErrorMessage(`Please input the field...!`, 401)
    }

    const userEmail= await User.findOne({email})
    if(userEmail){
        if(password && (await bcryptjs.compare(password, userEmail.password))){
            res.status(200).json({
                success:true,
                data:{
                    _id: userEmail._id,
                    name: userEmail.name,
                    email: userEmail.email,
                    isAdmin: userEmail.isAdmin,
                    role:userEmail.role,
                    token: generateToken(userEmail._id)
                }
            })
            return
        }
        throw new ErrorMessage(`User password is uncorrectly...!`, 401)
    }else{
       throw new ErrorMessage(`Useremail does not exist...!`, 401) 
    }
    
})

const logOutUser = asyncHandler(async(req, res) =>{

    if(!req.user){
        throw new ErrorMessage(`User does not exist...!`, 401)
    }
    if(!req.user.id){
        throw new ErrorMessage(`User not authorize...!`, 401)
    }
    const user= await User.findById(req.user.id).select('-password')
    if(!user){
        throw new ErrorMessage(`User not authorize`, 401)
    }

    res.status(200).json({
        success:true,
        data:user,
        user:{}
    })
})

const updateProfileUser= asyncHandler(async(req, res) =>{

    const {name, email, password} = req.body
    if(!req.user){
        throw new ErrorMessage(`User does not exist...!`, 401)
    }
    if(!req.user.id){
        throw new ErrorMessage(`User not authorize...!`, 401)
    }
    const userId= await User.findById(req.user._id)
    if(userId){
        userId.name= name || userId.name
        userId.email= email || userId.email
        if(password){
            const genSalt= await bcryptjs.genSalt(10)
            const hash = await bcryptjs.hash(password, genSalt)
            userId.password= hash
        }
        const user= await userId.save()
        res.status(200).json({
            data:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                role:user.role,
                token: generateToken(user._id)
            }
        })
    }else{
        throw new ErrorMessage(`User not authorize completely...!`, 401)
    }
})

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.EPXIRE_IN})
}

module.exports= {
    getUser,
    registerUser,
    logInUser,
    logOutUser,
    updateProfileUser
}