const express = require("express");
const controller = require("../../controllers/client/user.controller");
const uploadCloud = require("../../middlewares/client/uploadCloudinary.middleware");
// upload image
const multer = require('multer')
// const upload = multer({storage: storageMulter()});
const upload = multer();
const route = express.Router();
route.post("/login",
    upload.single("avatar"),
    uploadCloud.upload,
    controller.login);
module.exports = route; 