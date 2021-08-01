const express = require("express")
const router = express.Router();

const { getAllCountries, getCountryStates, getStateCities } = require("../controllers/uitilities/countries")

router.get("/countries", getAllCountries)
router.get("/country_states/:id", getCountryStates)
router.get("/state_cities/:id", getStateCities)

module.exports = router