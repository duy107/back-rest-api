const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const jobRoute = require("./job.route");
const cvRoute = require("./cv.route");
const middleware = require("../../middlewares/client/auth.middeware");
module.exports = (app) => {
    app.use("/", userRoute);
    app.use("/", jobRoute);
    app.use("/auth", middleware.auth, authRoute);
    app.use("/cv", cvRoute);
}