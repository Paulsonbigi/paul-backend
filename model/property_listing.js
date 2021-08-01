const mongoose = require("mongoose")
const validator = require('validator');

const { Schema } = mongoose

const propertyListing = new Schema({
    title: {
        type: String,
        required: [true, "Title field is required"]
    },
    property_type: {
        type: String,
        required: [true, "Property type field is required"]
    },
    bedrooms: {
        type: String,
        required: [true, "number of bedrooms required"]
    },
    bathrooms: {
        type: String,
        required: [true, "Number of bathrooms is required"]
    },
    unit: {
        type: String,
        required: [true, "unit of measurement is required"]
    },
    land_mass: {
        type: String,
        required: [true, "Land size is required"]
    },
    address: {
        type: String,
        required: [true, "Address field is required"]
    },
    phone_number: {
        type: String,
        required: [true, "Phone number is required"]
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    agreementForm : {
        type: String,
        data: Buffer,
        required: [true, "Agreement form is needed"]
    },
    pictures: {
        data: Buffer,
        type: Array,
        required: [true, "Pictures are needed"]
    },
    videos: {
        type: Array,
        data: Buffer,
        required: [true, "Please upload videos for prospective clients to see"]
    }
})

module.exports = mongoose.model("PropertyListing", propertyListing)