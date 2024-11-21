const express = require("express");
const controller = require("../../controllers/admin/city.controller");
const route = express.Router();
route.get("/", controller.listCity);
module.exports = route;