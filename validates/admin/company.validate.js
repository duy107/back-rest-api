const Company = require("../../models/company.model");
const md5 = require("md5");
module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Company.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return;
    }
    if (user.password != md5(password)) {
        res.json({
            code: 400,
            message: "Mật khẩu không chính xác!"
        })
        return;
    }
    if (user.status == "inactive") {
        res.json({
            code: 400,
            message: "Tài khoản đã bị khóa!"
        })
        return;
    }
    next();
}