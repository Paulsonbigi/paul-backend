const express = require("express")
const router = express.Router();
const Roles = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { AllUsers } = require("../controllers/user")

router.get("/",auth,  AllUsers)

module.exports = router