const express = require("express")
const router = express.Router();

const { getAllCountries, getCountryStates, getStateCities } = require("../controllers/uitilities/countries")

router.get("/countries", getAllCountries)
// slug is the country's name
router.get("/country_states/:slug", getCountryStates)
router.get("/state_cities/:country/:slug", getStateCities)

module.exports = router