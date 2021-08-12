const mongoose = require("mongoose")
const validator = require('validator');
const AppError = require("../Error/appError");
const { Schema } = mongoose

const ListingSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title field is required"]
    },
    is_active: {
        type: Boolean,
        default: true
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
    country: {
        type: String,
        required: [true, "Country of residence is required"]
    },
    state: {
        type: String,
        required: [true, "State of residence is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
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
    }
})

// ListingSchema.pre("save", function(next) {
//     propertyListing.find({ title: this.title}, (err, list) => {
//         if(list.length === 0) {
//             return next()
//         }
//         next (new AppError ("This title already exits", 400))
//         return false
//     })
// })

module.exports = mongoose.model("PropertyListing", ListingSchema)