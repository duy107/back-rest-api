const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/cv.controller");
route.get("/", controller.listCv);
route.patch("/changeStatus", controller.changeStatus);
route.delete("/delete", controller.delete);
module.exports = route;