const express = require("express");
const controller = require("../../controllers/admin/tag.controller");
const route = express.Router();
route.get("/", controller.listTag);
module.exports = route;