const express = require("express")
const router = express.Router();
const {auth} = require("../middleware/auth")

const { getCheckOutSession  } = require("../controllers/payment")

router.get('/checkout-session/:propertyID', auth, getCheckOutSession)

module.exports = router