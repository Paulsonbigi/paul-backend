const express = require("express")
const router = express.Router();
const Roles = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { ListProperty, getListedProperties, getPaginatedProperties, getSelectedPropertyByTitle, getSelectedPropertyByCountry } = require("../controllers/property.listing")

router.post("/list", auth,  ListProperty)
router.get("/listings", getListedProperties)
router.get(`/listings/selected`, getPaginatedProperties)
router.get(`/listings/_slug`, getSelectedPropertyByCountry)

module.exports = router