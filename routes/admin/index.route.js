const companyRoute = require("./company.route");
const overviewRoute = require("./overview.route");
const jobManagementRoute = require("./job-management.route");
const cvManagementRoute = require("./cv-management.route");
const authRoute = require("./auth.route");
const tagRoute = require("./tag.route");
const cityRoute = require("./city.route");
const middleware = require("../../middlewares/admin/auth.middeware");
// const overviewRoute 
module.exports = (app) => {
    app.use("/admin", companyRoute);
    app.use("/admin/auth", middleware.auth, authRoute);
    app.use("/admin/overview", middleware.auth, overviewRoute);
    app.use("/admin/job-management", middleware.auth, jobManagementRoute);
    app.use("/admin/tag", tagRoute);
    app.use("/admin/city", cityRoute);
    app.use("/admin/cv-management", middleware.auth, cvManagementRoute);
}