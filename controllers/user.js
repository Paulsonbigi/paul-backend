const User = require('../model/user');
const AppError = require('../Error/appError');
const multer = require("multer");

const upload = multer({ dest: '../utils/uploads' })

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
    // const 
  } catch(err){
    next(new AppError(err.message, 404))
  }
}