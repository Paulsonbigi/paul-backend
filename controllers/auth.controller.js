const gravatar = require("gravatar")
const normalize = require("normalize-url");
const multer = require("multer");
const path = require("path");
const ejs = require('ejs');
const crypto = require("crypto")

const User = require("../model/user")
const AppError = require("../Error/appError");
const Email = require('../utils/sendEmail');
const catchAsync = require("../utils/catch")
// const upload = require('../utils/fileUpload');




const sendToken = async (user, res, statusCode) => {
    const token = await user.getJwtToken();
    const cookieOption = {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
    };
    if(process.env.NODE_ENV === "production"){
      // only on https else user won't be assigned any cookie
        cookieOption.secure = true;
    };
    user.password =undefined;

    res.cookie("token", token, cookieOption).status(statusCode).json({
        success: true,
        token,
        user
    })
}


var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, "./utils/uploads/"));
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 3000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image "));
    }

    cb(undefined, true);
  }
});


// @Route POST A USER
// @desc register a new user on the database
//  @access public access
exports.register = async (req, res, next) => {
        try{
          // send user a confirmation email
          const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body

          const avatar = normalize(
              gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
              }),
              { forceHttps: true }
          );

          const user = await User.create({ firstName, lastName, email, phoneNumber, password, confirmPassword, image:avatar })

          const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL;
          new Email(user, url).sendWelcome()
      
          sendToken(user, res, 200);
        }catch(err){
          next(new AppError(err.message, 404))
        }
}

// @Route POST A USER
// @desc login existing user on the database
//  @access public access
exports.login = catchAsync(async (req, res, next) => {
    try{
      const { email, password } = req.body;
    
      // check if user exists
      const user = await User.findOne({ email }).select('+password');
  
      if (!user) return next(new AppError('User does not exist', 400));
    
      // check if password matches
      // since bcrypt.compare(password, user.password) returns true or false
    
      if (!(await user.comparePassword(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
      }

      sendToken(user, res, 200);
      
    }catch(err){
      next(new AppError(err.message, 404))
    }
    
  });

// @Route POST request
// @desc request for password change
//  @access public access
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    data: {}
  })
}

// @Route POST request
// @desc request for password change
//  @access public access
exports.forgotPassword = async (req, res, next) => {
    try{
      // get user based on posted email
      const { email } = req.body;

      // check if user exists
      const user = await User.findOne({email})
        if(!user) return next(new AppError("User does not exit", 404 ))
    
      // generate random token
      const resetToken = user.createPasswordRestToken()

      await user.save({ validateBeforeSave: false })
      const url = `${req.protocol}://${req.get('host')}/forgot-password/reset/${resetToken}`
      // const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL + `${resetToken}` : process.env.PROD_URL;

      await new Email(user, url).passwordReset()
      res.status(200).json({
        success: true,
        msg: "Password reset token has been sent to your email"
      })

    }catch(err){
      next(new AppError(err.message, 404))
    }
  };

// @Route POST request
// @desc request for password change
//  @access private access
exports.resetPasword = async (req, res, next) => {
  console.log(req.params.token)

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({ forgotPasswordResetToken: hashedToken, forgotPasswordExpires: {$gt: Date.now()} })

  // if user does not exist
  if(!user) return next(new AppError("Token is invalid or has expired", 400))

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.forgotPasswordResetToken = undefined
    user.forgotPasswordExpires = undefined

    await user.save()

    const token = sign

    sendToken(user, res, 200);
}
// @Route POST request
// @desc update password
//  @access private access
exports.updatePasswordRequest = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email }).select('+password')
    if(!user) return next(new AppError("Please enter a valid email", 400))

    res.status(200).json({
      success: true,
      msg: "A "
    })

  
}

// @Route POST request
// @desc update password
//  @access private access
exports.updatePassword = async (req, res, next) => {
  const { newPassword, currentPassword, confirmPassword } = req.body

  const id = req.user.id
}

// @Route POST request
// @desc update password
//  @access public access
exports.updateEmailRequest = async (req, res, next) => {

  try{
    const { email } = req.body
    const user = await User.findOne({ email }).select('+password')
    if(!user) return next(new AppError("Please enter a valid email, you can't perform this operation.", 400))
    

    let token = await user.getJwtToken()
    const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL+ `/email-rest/${token}` : process.env.PROD_URL + `/email-rest/${token}`;
    await new sendEmail(user, url).emailResetRequest()
    
    await res.status(200).json({
      succes: true,
      msg: "An email reset token has been sent to this email"
    })
  } catch(err){
      next(new AppError(err.message, 404))
  }
}

// @Route POST request
// @desc update password
//  @access private access
exports.updateEmail = async (req, res, next) => {

  try{
    const { email } = req.body
    const user = await User.findOne({ email }).select('+password')
    if(!user) return next(new AppError("Please enter a valid email, you can't perform this operation.", 400))
    

    let token = await user.getJwtToken()
    const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL+ `/email-rest/${token}` : process.env.PROD_URL + `/email-rest/${token}`;
    new sendEmail(user, url).emailResetRequest()
    
    await res.status(200).json({
      succes: true,
      msg: "An email reset token has been sent to this email"
    })
  } catch(err){
      next(new AppError(err.message, 404))
  }
}