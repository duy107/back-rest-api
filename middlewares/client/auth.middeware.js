const User = require("../../models/user.model");
module.exports.auth = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({
            tokenUser: token,
            deleted: false,
            status: "active"
        }).select("-password");

        if (!user) {
            res.json({
                code: 400,
                message: "Token không hợp lệ!"
            })
            return;
        }
        res.locals.user = user;
    } else {
        const token = req.cookies.tokenUser;
        const user = await User.findOne({
            tokenUser: token,
            deleted: false
        }).select("-password");
        if (!user) {
            res.json({
                code: 400,
                message: "Sai token!"
            })
            return;
        }
        res.locals.user = user;
    }
    next();
}