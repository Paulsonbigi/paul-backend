const express = require("express")
const router = express.Router();
const Roles = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { ListProperty, 
        getListedProperties, 
        getPaginatedProperties, 
        getSelectedPropertyByTitle, 
        getSelectedPropertyByCountry, 
        getSelectedPropertyByState,
        updateListedProperty,
        deleteAListedProperty,
        deleteAListedPropertyById
    } = require("../controllers/property.listing")

let roles = ["agent", "admin"]

// Get Routes
router.get("/listings", getListedProperties)
router.get(`/listing_property/:id`, auth, deleteAListedPropertyById)
router.get(`/listings/selected`, getPaginatedProperties)
router.get(`/listings/country/:slug`, getSelectedPropertyByCountry)
router.get(`/listings/state/:slug`, getSelectedPropertyByState)

// Post routes
router.post("/list", auth, authorize(roles),  ListProperty)

// Updates Routes
router.patch(`/update_property/:id`, auth, updateListedProperty)

// Delete Routes
router.delete("/delete_a_property/:id", auth, authorize(roles), deleteAListedPropertyById)

module.exports = router