const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const globalError = require('./Error/globalError');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const listingRoute = require('./routes/property.listing');
const placesRoute = require('./routes/countries');

// initializing express app
const app = express();
app.use(cors());
// staric file access
app.use(express.static(path.join(__dirname, '/public')));

// importing middlewares
app.use(express.json());
app.use(cookieParser());

// available apis
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/property_listing', listingRoute);
app.use('/api/v1/places', placesRoute);
app.use(globalError);

module.exports = app;
