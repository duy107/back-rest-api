const User = require("../models/user.model");
module.exports.auth = async (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({
            token: token,
            deleted: false,
            status: "active"
        }).select("-password");

        if(!user){
            res.json({
                code: 400,
                message: "Token không hợp lệ!"
            })
            return;
        }
        res.locals.user = user;
        next();
    }else{
        res.json({
            code: 400,
            message: "Chưa có token!"
        })
    }
}