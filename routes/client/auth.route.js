const express = require("express");
const controller = require("../../controllers/client/auth.controller");
const route = express.Router();
route.get("/", controller.auth);
module.exports = route;