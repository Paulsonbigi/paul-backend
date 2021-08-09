const express = require("express")
const router = express.Router();
const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")

const { getUser, getAllUsers } = require("../controllers/user")
const roles = [ "user", "admin"]
router.get("/get_profile", auth,  getUser)
router.get("/get_all_users", auth, authorize(roles[1]),  getAllUsers)

module.exports = router