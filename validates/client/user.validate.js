const User = require("../../models/user.model");
module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const base64Data = req.body.avatar.replace(/^data:image\/\w+;base64,/, "");
    req.body.avatar= Buffer.from(base64Data, "base64");
    // const user = await User.findOne({
    //     email: email,
    //     deleted: false
    // });
    // if (!user) {
    //     res.json({
    //         code: 400,
    //         message: "Email không tồn tại!"
    //     })
    //     return;
    // }
    // if (user.password != md5(password)) {
    //     res.json({
    //         code: 400,
    //         message: "Mật khẩu không chính xác!"
    //     })
    //     return;
    // }
    // if (user.status == "inactive") {
    //     res.json({
    //         code: 400,
    //         message: "Tài khoản đã bị khóa!"
    //     })
    //     return;
    // }
    next();
}