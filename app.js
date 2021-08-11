const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const globalError = require('./Error/globalError');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const listingRoute = require('./routes/property.listing');
const placesRoute = require('./routes/countries');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet"); 
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const hpp = require('hpp');

// initializing express app
const app = express();
app.use(cors());
// staric file access
app.use(express.static(path.join(__dirname, '/public')));

// secure HTTP header
app.use(helmet())

// Data sanitization against NOSql query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss())



// importing middlewares, reading data  from the req.body 
app.use(express.json({ limit: '10kb'}));

// importing middlewares
app.use(cookieParser());
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many request from this IP, please try again after one hour!"
  });
  app.use("/api/", limiter);
// prevent parameter pollution
app.use(hpp());

// available apis
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/property_listing', listingRoute);
app.use('/api/v1/places', placesRoute);
app.use(globalError);
app.all("*", (req, res, next) => {
    res.status(404).json({
        success: false,
        msg: "Route not defined"
    })
})

module.exports = app;
