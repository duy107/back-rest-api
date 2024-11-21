const express = require("express");
const controller = require("../../controllers/admin/overview.controller");
const route = express.Router();
route.get("/", controller.overview);
module.exports = route;