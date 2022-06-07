const express= require("express")
const path= require("path")
const router = express.Router()
const multer = require("multer")

const storage= multer.diskStorage({
  destination: function(req, file, cb){
    // cb(null, 'uploads/')
    cb(null, 'client/public/images/')
  },
  filename:function(req, file, cb){
    cb(null, `${file.fieldname}-${Date.now() + '-' + Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
  }
})

function checkFileSync(file, cb){
  const fileType = /jpg|jpeg|png|gif/
  const extType= fileType.test(path.extname(file.originalname).toLowerCase())
  const minetype= fileType.test(file.mimetype)
  if(extType && minetype){
    cb(null, true)
  }else{
    cb(null, false)
    return cb(new Error(`Image only...!`))
  }
}

const upload= multer({
  storage,
  fileFilter: function(req, file, cb){
    checkFileSync(file, cb)
  }
})

router.post('/', upload.single('image'), (req, res) =>{
  res.send(`/images/${req.file.filename}`)
})

module.exports= router