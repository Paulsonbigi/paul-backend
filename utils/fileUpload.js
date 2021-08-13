const multer = require("multer");
const path = require("path");
const upload = multer({ dest: '../utils/uploads' })

exports.uploadImage = upload.single("image")
