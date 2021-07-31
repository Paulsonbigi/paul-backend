const jwt = require('jsonwebtoken');
const user = require('../model/user');
const AppError = require('../Error/appError');

exports.auth = async (req, res, next) =>{

    // if(req.cookies.token) {
    //     token = req.cookies.token;
    // }
    const token = req.header("x-auth-token");
  // Check if no token is being sent
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return new AppError(err.message, 409)
  }
}


  