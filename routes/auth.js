const express = require("express")
const router = express.Router();

const {auth} = require("../middleware/auth")
const { register, login, logout, updateEmailRequest, forgotPassword, resetPasword } = require("../controllers/auth.controller")

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.patch("/reset-password/:token", resetPasword)
router.post("/email_update_request", auth, updateEmailRequest)
router.post("/logout", logout)

module.exports = router