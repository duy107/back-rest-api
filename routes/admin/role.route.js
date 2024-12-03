const express = require("express");
const controller = require("../../controllers/admin/role.controller");
const route = express.Router();
route.get("/", controller);
route.post("/create", controller.create);
route.delete("/delete", controller.delete);
route.patch("/update", controller.update);
route.patch("/changePermission", controller.changePermission);
module.exports = route;