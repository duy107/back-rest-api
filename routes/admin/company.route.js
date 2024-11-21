const validate = require("../../validates/admin/company.validate");
const controller = require("../../controllers/admin/company.controller");
const middleware = require("../../middlewares/admin/auth.middeware");
const express = require("express");
const route = express.Router();
// route.get("/login", controller.loginGet);
route.post("/login",
            validate.login,
            controller.login);
route.get("/infor", middleware.auth, controller.infor);
route.patch("/update", middleware.auth, controller.update);
module.exports = route;