const User = require("../../models/user.model");
const md5 = require("md5");
module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    // const base64Data = req.body.avatar.replace(/^data:image\/\w+;base64,/, "");
    // req.body.avatar= Buffer.from(base64Data, "base64");
    const user = await User.findOne({
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

module.exports.forgot = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false,
        status: "active"
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại hoặc đã bị khóa!"
        })
        return;
    }
    next();
}

module.exports.reset = (req, res, next) => {
    const { password, confirm } = req.body;
    const pattern = /(?=.*\d)(?=.*\W)(?=.*[A-Z]).{8,}/;
    if (md5(password) != md5(confirm)) {
        res.json({
            code: 400,
            message: "Mật khẩu không khớp!"
        })
        return;
    }

    if (!pattern.test(password)) {
        res.json({
            code: 400,
            message: "Mật khẩu tối thiểu 8 ký tự (ít nhất 1 số, 1 ký tự đặc biệt, 1 chữ hoa)!"
        })
        return;
    }
    next();
}

module.exports.register = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (user) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
        return;
    }
    next();
}

module.exports.edit = async (req, res, next) => {
    const token = req.cookies.tokenUser;
    const user = await User.findOne({
        tokenUser: {$ne: token},
        email: req.body.email,
        deleted: false
    });
    if(user){
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
        return;
    }
    next();
}