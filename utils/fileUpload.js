const multer = require("multer");
const path = require("path");
var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, "./uploads/"));
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 3000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image "));
    }

    cb(undefined, true);
  }
});

module.exports = upload;
