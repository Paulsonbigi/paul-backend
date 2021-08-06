const express = require("express")
const router = express.Router();

const {auth} = require("../middleware/auth")
const { register, login, logout } = require("../controllers/auth.controller")

router.post("/register", register)
router.post("/login", login)
// router.get("/get_profile", auth, getUser)
router.post("/logout", logout)

module.exports = router