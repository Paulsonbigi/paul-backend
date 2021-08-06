const User = require('../model/user');
const AppError = require('../Error/appError');

// @Route GET request
// @desc request to get authenticated user
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
  