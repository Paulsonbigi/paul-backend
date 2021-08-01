const PropertyListing = require('../model/property_listing');
const AppError = require('../Error/appError');
const propertyListing = require("../model/property_listing")

exports.ListProperty = async (req, res, next) => {
    const { title, property_type, bedrooms, bathrooms, unit, land_mass, address, phone_number, author } = req.body
    try{

        const Listing = await propertyListing.findOne({ title })
        if(Listing) return next(new AppError('Create a unique title', 400)); 

        const newListing = propertyListing({ title, property_type, bedrooms, bathrooms, unit, land_mass, address, phone_number, author })
        await newListing.save()
            res.status(200)
            res.json({msg: 'Listing created successfully'})
    } catch(err){
        next(new AppError(err.message, 404))
    }
}