const mongoose = require("mongoose")

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
    }
})

module.exports = mongoose.model("PropertyListing", propertyListing)