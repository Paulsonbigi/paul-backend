const PropertyListing = require('../model/property_listing');
const AppError = require('../Error/appError');
const propertyListing = require("../model/property_listing")
const queryString = require("query-string")
const { MongoClient, ObjectID } = require('mongodb')

// custom response 
const sendData = async (data, res, statusCode) => {
    res.status(statusCode).json({
        success: true,
        data
    })
}

// @Route POST request
// @desc request to list a property
//  @access private access
exports.ListProperty = async (req, res, next) => {
    
    
    try{
        const { title, property_type, bedrooms, bathrooms, unit, land_mass, address, phone_number, author, city, state, country } = req.body
        
        const Listing = await propertyListing.findOne({ title })
        if(Listing) return next(new AppError('Create a unique title', 400)); 

        const newListing = propertyListing({ title, property_type, bedrooms, bathrooms, unit, land_mass, address, phone_number, author, country, state, city })
        await newListing.save()

            res.status(200).json({msg: 'Listing created successfully'})
    } catch(err){
        next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get all available properties and also filters the other data
// @access public access
exports.getListedProperties = async (req, res, next) => {
    try{
        const queryObj = {...req.query}
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el])

        const AllListedPropeties = await propertyListing.find(queryObj)
        if(AllListedPropeties.length === 0) return next(new AppError("Not available", 400))
        sendData(AllListedPropeties, res, 200)

    }catch(err){
      next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get all available properties
// @access public access
exports.getActiveListedProperties = async (req, res, next) => {
    try{
        const AllListedPropeties = await propertyListing.find({ is_active: true })
        sendData(AllListedPropeties, res, 200)

    }catch(err){
      next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get all available properties
// @access public access
exports.getListedProperty = async (req, res, next) => {
    try{
        let listingID = req.params.id
        if(!listingID) return next(new AppError("In correct property id", 401))
        const listedProperty = await propertyListing.findById(ObjectID(listingID))
            if(!listedProperty) return next(new AppError("Property not listed", 401))

        sendData(listedProperty, res, 200)

    }catch(err){
      next(new AppError(err.message, 404))
    }
}

// @Route PATCH request
// @desc request to get all available properties
// @access public access
exports.updateListedProperty = async (req, res, next) => {
    try{
        let listingID = req.params.id 
        
        const propertyForUpdate = await propertyListing.findByIdAndUpdate( ObjectID(listingID), req.body, { new: true}, (err, data) =>{
            if(err) return next(new AppError("Unknown request", 401))

            res.status(200).json({
                success: true,
                msg: "Property updated successfully"
            })
        } )
    }catch(err){
      next(new AppError(err.message, 404))
    }
}

// @Route DELETE request
// @desc request to get all available properties
// @access public access
exports.deleteAListedPropertyById = async (req, res, next) => {
    try{
        let listingID = req.params.id 
        
        const propertyForUpdate = await propertyListing.findByIdAndDelete( ObjectID(listingID), req.body, { new: true}, (err, data) =>{
            if(err) return next(new AppError("Unknown request", 401))

            res.status(200).json({
                success: true,
                msg: "Property deleted successfully"
            })
        } )
    } catch(err){
        next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get paginated properties 
// @access public access
exports.getPaginatedProperties = async (req, res, next) => {
    try{

        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        
        propertyListing.find()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec(function(err, queriedProducts) {
                if(err) return next(new AppError(err.message, 404))

                sendData(queriedProducts, res, 200)
            })
    } catch(err) {
        next(new AppError(err.message, 404))
    }
}