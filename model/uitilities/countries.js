const mongoose = require("mongoose")

const { Schema } = mongoose

const countriesSchema = new Schema({
    
})


module.exports = mongoose.model("countries", countriesSchema)