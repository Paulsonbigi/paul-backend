const express = require("express")
const router = express.Router();
const { ADMIN_ROLE } = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { AllUsers } = require("../controllers/user")
const roles = ['admin', "super admin"]
router.get("/", auth, authorize(roles),  AllUsers)

module.exports = router