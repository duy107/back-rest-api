const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/job.controller");

route.get("/list", controller.list);
route.get("/search", controller.search);
route.get("/jobs/:slug", controller.detail);
module.exports = route;