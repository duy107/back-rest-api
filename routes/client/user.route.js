const express = require("express");
const controller = require("../../controllers/client/user.controller");
const uploadCloud = require("../../middlewares/client/uploadCloudinary.middleware");
const validate = require("../../validates/client/user.validate");
// upload image
const multer = require('multer')
// const upload = multer({storage: storageMulter()});
const upload = multer();
const route = express.Router();
route.post("/login",
    validate.login,
    uploadCloud.upload,
    controller.login);
module.exports = route; 