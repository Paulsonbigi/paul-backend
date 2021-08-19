const AppError = require('../Error/appError')
const Payment = require('../model/payment');
const propertyListing = require("../model/property_listing");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getCheckOutSession = async (req, res, next) => {
    try{
        // get the ID of the property
        const property = await propertyListing.findById(req.params.propertyID)
        // create a checkout session
        const session = await stripe.getCheckOutSession.getCheckOutSession.create({
            payment_method_types: ['card'],
            success_url: `${req.protocol}://${req.get('host')}/`,
            cancel_url: `${req.protocol}://${req.get('host')}/property/${property.slug}`,
            customer_email: req.user.email,
            client_reference_id: req.params.propertyID,
            line_items: [{
                name: `${property.name} property`,
                amount: property.price * 100,
                currency: 'usd',
                quantity: 1,
                description: property.summary,
                images: ['']
              }],
        })
        // create session as a response
        res.status(200).json({
            success: true,
            session
        })
    } catch(err) {
        next( new AppError(err.message, 404))
    }
}