const md5 = require("md5");
const userRoute = require("./user.route");
module.exports = (app) => {
    app.use("/user", userRoute);
    
}