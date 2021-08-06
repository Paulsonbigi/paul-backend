const express = require("express")
const router = express.Router();
const { ADMIN_ROLE } = require("../utils/roles")
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { getUser } = require("../controllers/user")
const roles = ['admin', "super admin"]
router.get("/get_profile", auth,  getUser)

module.exports = router