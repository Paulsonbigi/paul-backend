const mongoose = require("mongoose")
const validator = require('validator');
const AppError = require("../Error/appError");
const { Schema } = mongoose
const geocoder = require("../utils/geocoder")

const ListingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title field is required"]
    },
    is_active: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number, 
        default: null
    },
    property_type: {
        type: String,
        // required: [true, "Property type field is required"]
    },
    bedrooms: {
        type: String,
        // required: [true, "number of bedrooms required"]
    },
    bathrooms: {
        type: String,
        // required: [true, "Number of bathrooms is required"]
    },
    unit: {
        type: String,
        // required: [true, "unit of measurement is required"]
    },
    land_mass: {
        type: String,
        // required: [true, "Land size is required"]
    },
    country: {
        type: String,
        // required: [true, "Country of residence is required"]
    },
    state: {
        type: String,
        // required: [true, "State of residence is required"]
    },
    city: {
        type: String,
        // required: [true, "City is required"]
    },
    address: {
        type: String,
        // required: [true, "Address field is required"]
    },
    phone_number: {
        type: String,
        // required: [true, "Phone number is required"]
    },
    author: {
        type: String,
        // required: [true, "Author is required"]
    },
    slug: {
        type: String,
        slug: "title"
    },
    agreementForm : {
        type: String,
        data: Buffer
    },
    pictures: {
        data: Buffer,
        type: Array
    },
    videos: {
        type: Array,
        data: Buffer
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
        //   required: true
        },
        coordinates: {
          type: [Number],
          index: "2dsphere"
        },
        formattedAddress: String,
        zipCode: String
    }
})

// Geocode and create location
ListingSchema.pre("save", async function(next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        zipCode: loc[0].zipcode
    }
    // don't save address
    this.address = undefined
    next()
})

module.exports = mongoose.model("PropertyListing", ListingSchema)