const PropertyListing = require('../model/property_listing');
const AppError = require('../Error/appError');

exports.ListProperty = async (req, res, next) => {
    try{
        res.send("Hello Paul")
    } catch(err){
        next(new AppError(err.message, 404))
    }
}