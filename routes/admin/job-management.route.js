const express = require("express");
const controller = require("../../controllers/admin/job.controller");
const app = express.Router();
app.get("/", controller.listJob);
app.patch("/update", controller.update);
app.delete("/delete", controller.delete);
app.post("/create", controller.create);
module.exports = app;