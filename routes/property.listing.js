const express = require("express")
const router = express.Router();
const Roles = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { ListProperty } = require("../controllers/property.listing")

router.post("/list", auth,  ListProperty)

module.exports = router