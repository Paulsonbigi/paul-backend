const express = require("express")
const router = express.Router();
const multer = require("multer");

const {auth} = require("../middleware/auth")
const {authorize} = require("../middleware/resrict")
const upload = multer({ dest: '../utils/uploads' })

const { getUser, getAllUsers, uploadProfilePicture } = require("../controllers/user")
const roles = [ "user", "admin"]
router.get("/get_profile", auth,  getUser)
router.get("/upload_profile_picture", auth, upload.single('uploaded_file'),  uploadProfilePicture)
router.get("/get_all_users", auth, authorize(roles[1]),  getAllUsers)

module.exports = router