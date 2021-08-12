const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require('validator');
const crypto = require("crypto")

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
        enum: ['user', "admin", "agent", "landlord"],
        default: "user"
    },
    is_active: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    confirmed: {
        type: String,
        enum: ["pending", "deactivated", "confirmed"],
        default: "pending"
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
        type: Date,
    },
    slug: {
        type: String,
        slug: "title"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    passwordChangedAt: {
        type: Date
    }
})

UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined
})

UserSchema.pre('save', async function(next){
    if(!this.isModified("password") || this.isNew){
        return next();
    }
    this.passwordChangedAt = Date.now()
    next()
})

UserSchema.methods.getJwtToken = async function (){
    return await jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRES
    })
};

UserSchema.methods.comparePassword = async function (candidate, savedPassword) {
    return await bcrypt.compare(candidate, savedPassword)
}

UserSchema.methods.createPasswordRestToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.forgotPasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 

    
    this.forgotPasswordExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
    
}

module.exports = mongoose.model("user", UserSchema)