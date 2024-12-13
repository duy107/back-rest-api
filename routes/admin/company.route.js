const validate = require("../../validates/admin/company.validate");
const controller = require("../../controllers/admin/company.controller");
const middleware = require("../../middlewares/admin/auth.middeware");
const express = require("express");
const route = express.Router();
route.post("/login",
            validate.login,
            controller.login);
route.get("/infor", middleware.auth, controller.infor);
route.patch("/update", middleware.auth, controller.update);
route.get("/account-management", middleware.auth, controller.account);
route.post("/account-management/create",
    middleware.auth,
    validate.createAccout,
    controller.accountCreate);
route.delete("/account-management/delete", middleware.auth, controller.accountDelete);
route.patch("/account-management/update", middleware.auth, controller.accountUpdate);
module.exports = route;