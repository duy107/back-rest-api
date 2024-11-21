const Company = require("../../models/company.model");
module.exports.auth = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const company = await Company.findOne({
            token: token,
            deleted: false
        }).select("-password");

        if (!company) {
            res.json({
                code: 400,
                message: "Token không hợp lệ!"
            })
            return;
        }
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Chỉ gửi cookie qua HTTPS
            sameSite: "none", // Hỗ trợ cross-origin
        });
        res.locals.company = company;
    } else {
        const token = req.cookies.token;
        const company = await Company.findOne({
            token: token,
            deleted: false
        }).select("-password");
        if (!company) {
            res.json({
                code: 400,
                message: "Sai token!"
            })
            return;
        }
        res.locals.company = company;
    }
    next();
}
