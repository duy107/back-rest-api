const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/cv.controller");
route.post("/create", controller.create);
route.get("/:id/:status", controller.getByIdUser);
module.exports = route;