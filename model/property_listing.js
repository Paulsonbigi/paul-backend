const mongoose = require("mongoose")
const validator = require('validator');
const AppError = require("../Error/appError");
const { Schema } = mongoose

const ListingSchema = new Schema({
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