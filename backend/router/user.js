const express= require('express')
const router= express.Router()
const {
    getUser,
    registerUser,
    logInUser,
    logOutUser,
    updateProfileUser
} = require('../controller/userController')
const {authMiddleware} = require('../middleware/authMiddleware')

router.route('/profile').get(authMiddleware, getUser).put(authMiddleware, updateProfileUser)
router.post('/register', registerUser)
router.post('/', logInUser)
router.get('/logout', authMiddleware, logOutUser)

module.exports= router