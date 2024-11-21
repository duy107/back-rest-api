const express = require("express");
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const route = express.Router();
const uploadFile = require("../../middlewares/client/uploadCloudinary.middleware");
const multer = require('multer')
const upload = multer()
route.post("/login",
    validate.login,
    controller.login);
route.post("/forgot",
    validate.forgot,
    controller.forgot);
route.post("/forgot/otp", controller.otp);
route.post("/forgot/reset",
    validate.reset,
    controller.reset);
route.post("/register",
    upload.single("avatar"),
    validate.register,
    uploadFile.upload,
    controller.register);
route.patch("/infor/change",
    upload.single("avatar"),
    validate.edit,
    uploadFile.upload,
    controller.changeInfor
)   
module.exports = route; 