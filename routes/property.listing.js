const express = require("express")
const router = express.Router();
const Roles = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { ListProperty, 
        getListedProperties, 
        updateListedProperty,
        deleteAListedProperty,
        deleteAListedPropertyById,
        getActiveListedProperties
    } = require("../controllers/property.listing")

let roles = ["agent", "admin", "landlord"]

// Get Routes
router.get("/listings", getListedProperties)
router.get(`/active_listing`, getActiveListedProperties)
router.get(`/listing_property/:id`, auth, deleteAListedPropertyById)

// Post routes
router.post("/list", auth, authorize(roles),  ListProperty)

// Updates Routes
router.patch(`/update_property/:id`, auth, authorize(roles), updateListedProperty)

// Delete Routes
router.delete("/delete_a_property/:id", auth, authorize(roles), deleteAListedPropertyById)

module.exports = router