const User = require('../model/user');
const AppError = require('../Error/appError');
const multer = require("multer");

const upload = multer({ dest: '../utils/uploads' })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../utils/uploads')
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1]
//     cb(null, `user-${}` + '-' + ext)
//   }
// })


// @Route GET request
// @desc request to get authenticated user details
//  @access private access
exports.getUser = async (req, res, next) => {
    try{
      res.status(200).json({
        user: req.user
      })
  
    } catch(err){
      next(new AppError(err.message, 404))
    }
  }

  // @Route GET request
// @desc request to get authenticated user details restricted to admin only
//  @access private access
exports.getAllUsers = async (req, res, next) => {
  try{
    const user = await User.find()
      if(!user) return next(new AppError("No registered user yet", 400))

      await res.status(200).json({
        success: true, 
        data: user
      })

  } catch(err){
    next(new AppError(err.message, 404))
  }
}

// @Route GET request
// @desc request to get authenticated user details restricted to admin only
//  @access private access
exports.uploadProfilePicture = async (req, res, next) => {
  try{

    console.log(req.body)
    console.log(req.file)
    // const 
  } catch(err){
    next(new AppError(err.message, 404))
  }
}