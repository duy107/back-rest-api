const express = require("express");
const controller = require("../../controllers/admin/auth.controller");
const route = express.Router();
route.get("/", controller.auth);
module.exports = route;