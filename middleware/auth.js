const jwt = require('jsonwebtoken');
const user = require('../model/user');
const AppError = require('../Error/appError');

exports.auth = async (req, res, next) =>{
    let token

    if(req.cookies.token) {
        token = req.cookies.token;
    }

    if(!token){
        return res.status(401).json({ msg: 'Unauthorized user' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await user.findById(docoded.id)
        next()
    } catch(err){
        return new AppError(err.message, 409)
    }
}


  