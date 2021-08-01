const PropertyListing = require('../model/property_listing');
const AppError = require('../Error/appError');
const propertyListing = require("../model/property_listing")

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
        const { title, property_type, bedrooms, bathrooms, unit, land_mass, address, phone_number, author } = req.body
        
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

// @Route GET request
// @desc request to get all available properties
// @access public access
exports.getListedProperties = async (req, res, next) => {
    try{
        const AllListedPropeties = await propertyListing.find()
        sendData(AllListedPropeties, res, 200)

    }catch(err){
      next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get paginated properties 
// @access public access
exports.getPaginatedProperties = async (req, res, next) => {
    try{

        let page = req.query.page
        let limit = req.query
        
        let queriedProducts = await propertyListing.findAll().paginate({page: page, limit: limit}).exec()
        sendData(queriedProducts, res, 200)

    } catch(err) {
        next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get a with different query parameters
// @access public access
exports.getSelectedPropertyByTitle = async (req, res, next) => {
    try{

        let title = req.param.title

        const property = await propertyListing.findOne({ title })
        if(!property) return next(new AppError('No such property exists', 400)); 

        sendData(property, res, 200)

    } catch(err) {
        next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get a with different query parameters
// @access public access
exports.getSelectedPropertyByNumberOfBathrooms = async (req, res, next) => {
    try{

        let preferredBethrooms = req.param.bathrooms
        if(!preferredState) return next(new AppError('State not available', 400)); 

        const sortedDate = propertyListing.filter( result => result.bathrooms === preferredBethrooms)

        const property = await sortedDate.find()
        if(!property) return next(new AppError('No such property exists', 400)); 

        sendData(property, res, 200)

    } catch(err) {
        next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get a with different query parameters
// @access public access
exports.getSelectedPropertyByCountry = async (req, res, next) => {
    try{

        let preferredCountry = req.param.country
        if(!preferredState) return next(new AppError('State not available', 400)); 

        const sortedDate = propertyListing.filter( result => result.country === preferredCountry)

        const property = await sortedDate.find()
        if(!property) return next(new AppError('No such property exists', 400)); 

        sendData(property, res, 200)

    } catch(err) {
        next(new AppError(err.message, 404))
    }
}

// @Route GET request
// @desc request to get a with different query parameters
// @access public access
exports.getSelectedPropertyByState = async (req, res, next) => {
    try{

        let preferredState = req.param.state
        if(!preferredState) return next(new AppError('State not available', 400)); 

        const sortedDate = propertyListing.filter( result => result.state === preferredState)

        const property = await sortedDate.find()
        if(!property) return next(new AppError('No such property exists', 400)); 

        sendData(property, res, 200)

    } catch(err) {
        next(new AppError(err.message, 404))
    }
}

