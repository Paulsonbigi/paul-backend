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
        updateListedProperty
    } = require("../controllers/property.listing")

    let roles = ["agent"]
router.post("/list", auth, authorize(roles),  ListProperty)
router.get("/listings", getListedProperties)
router.get(`/listings/selected`, auth, getPaginatedProperties)
router.get(`/listings/country/:slug`, getSelectedPropertyByCountry)
router.get(`/listings/state/:slug`, getSelectedPropertyByState)
router.patch(`/update_property/:id`, auth, updateListedProperty)

module.exports = router