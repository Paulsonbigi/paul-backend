const User = require('../model/user');
const AppError = require('../Error/appError');

exports.AllUsers = async (req, res, next) => {
    try{
        res.send("Hello Paul")
    } catch(err){
        next(new AppError(err.message, 404))
    }
}