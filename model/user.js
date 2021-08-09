const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require('validator');

const { Schema } = mongoose

const UserSchema = new Schema({
    firstName: { 
        type: String,
        requires: [true, "first name field is required"]
    },
    lastName: { 
        type: String,
        requires: [true, "last name field is required"]
    },
    email: {
        type: String,
        required: [true, "email field is required"],
        unique: true,
        validate: [validator.isEmail, "invalid email format, email should be in the form example.gmail.com"],
        lowercase: true,
    },
    emailConfirmCode: String,
    emailConfirmDate: Date,
    phoneNumber: {
        type: String,
        required: [true, "phone number field is required"]
    },
    image: String,
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        minLength: 6,
        select: false,
        required: [true, "password field is required"]
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function(val){
                return val = this.email
            },
            message: 'password do not match',
        },
        required: [true, 'Confirm password to continue']
    },
    resetLink: {
        type: String,
        default: ""
    },
    forgotPasswordResetToken: {
        type: String,
    },
    forgotPasswordExpires: {
        type: String,
    },
    slug: {
        type: String,
        slug: "title"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined
})

UserSchema.methods.getJwtToken = async function (){
    return await jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "3000s"
    })
};

UserSchema.methods.comparePassword = async function (candidate, savedPassword) {
    return await bcrypt.compare(candidate, savedPassword)
}

module.exports = mongoose.model("user", UserSchema)