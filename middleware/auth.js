const jwt = require('jsonwebtoken');
const user = require('../model/user');
const AppError = require('../Error/appError');

exports.auth = async (req, res, next) =>{
   
  // // Verify token
  try {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = headers.authorization.split(" ")[1];
    } else if(req.cookies.token) {
        token = req.cookies.token;
    }

    // Check if no token is being sent
    if (!token) {
      return next(
        new AppError("No token, you are not logged in", 401)
      )
    }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = user.findById(decoded.id).select("+password")
      console.log(currentUser)
        if(!currentUser) {
          return new AppError("User has been logged out", 401)
        }   
        // if(currentUser.checkpassword(decoded.iat)){
        //   return new AppError("This user currently changed his password", 401)
        // }
        req.user = currentUser
        next()
  } catch (err) {
    return next(new AppError(err.message, 409))
  }
}