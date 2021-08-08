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
        getSelectedPropertyByState 
    } = require("../controllers/property.listing")

router.post("/list", auth,  ListProperty)
router.get("/listings", getListedProperties)
router.get(`/listings/selected`, auth, getPaginatedProperties)
router.get(`/listings/country/:slug`, getSelectedPropertyByCountry)
router.get(`/listings/state/:slug`, getSelectedPropertyByState)

module.exports = router