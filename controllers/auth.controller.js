const gravatar = require("gravatar")
const normalize = require("normalize-url");

const User = require("../model/user")
const AppError = require("../Error/appError");
const sendEmail = require('../utils/sendEmail');
const catchAsync = require("../utils/catch")

const sendToken = async (user, res, statusCode) => {
    const token = await user.getJwtToken();
    const cookieOption = {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
    };
    if(process.env.NODE_ENV === "production"){
        cookieOption.secure = true;
    };

    res.cookie("token", token, cookieOption).status(statusCode).json({
        success: true,
        data: user,
        token
    })
}

// @Route POST A USER
// @desc register a new user on the database
//  @access public access
exports.register = async (req, res, next) => {
        const { fullName, email, phoneNumber, password, confirmPassword} = req.body

        const avatar = normalize(
            gravatar.url(email, {
              s: '200',
              r: 'pg',
              d: 'mm',
            }),
            { forceHttps: true }
        );

        const user = await User.create({
            fullName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            image: avatar,
        })

        // send user a confirmation email
        try{

          const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL;
          new sendEmail(user, url).sendWelcome()
      
          sendToken(user, res, 200);
        }catch(err){
          next(new AppError(err.message, 404))
        }
}

// @Route POST A USER
// @desc login existing user on the database
//  @access public access
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new AppError('User does not exist', 400));
  
    // check if password matches
    // since bcrypt.compare(password, user.password) returns true or false
  
    if (!(await user.comparePassword(password, user.password))) {
      return next(new AppError('Invalid credentials', 400));
    }

    let url = `https//localhost:8080/api/v1/`

    try{
      // let sentEmail = new sendEmail( user, url).sendWelcome()
      // if(sentEmail){
      //   console.log("Email sent successfully")
      // }
      await  sendToken(user, res, 200);
    }catch(err){
      next(new AppError(err.message, 404))
    }
    
  });

// @Route POST request
// @desc request for password change
//  @access public access
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
  
    // check of the email matches existing emails
    const user = await User.findOne({ email }).select('+password')
    if(!user) return next(new AppError('User does not exist', 400))
    
  
    try{
      let token = jwt.sign({fullName, email, password}, user.getJwtToken(), {expiresIn: "10m"})
      const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL + `/forgot-password/reset/${token}`;
      await new sendEmail(user, url).passwordReset()
  
      sendToken(user, res, 200);
    }catch(err){
      next(new AppError(err.message, 404))
    }
  };

// @Route POST request
// @desc update password
//  @access public access
exports.updatePassword = async (req, res, next) => {
  const { newPassword, currentPassword, confirmPassword } = req.body

  const id = req.user.id
}