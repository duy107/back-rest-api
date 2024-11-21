const Company = require("../../models/company.model");
module.exports.login = async (req, res) => {
    const {email} = req.body;
    const company = await Company.findOne({email: email}).select("token");
    res.cookie("token", company.token , {
        httpOnly: true,
        secure: true, // Chỉ gửi cookie qua HTTPS
        sameSite: "none", // Hỗ trợ cross-origin
    });
    res.json({
        code: 200,
        message: "Login success",
        token: company.token
    })
}
module.exports.loginGet = async (req, res) => {
    const token = req.cookies.token;
    const company = await Company.findOne({token: token}).select("token");
    if(company){
        res.json({
            code: 400,
            message: "Đã đăng nhập!"
        })
    }
}
module.exports.infor = (req, res) => {
    res.json(res.locals.company);
}

module.exports.update = async (req, res) => {
    const id = res.locals.company.id;
    try {   
        await Company.updateOne({_id: id}, req.body);
        res.json({
            code: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật thất bại!"
        })
    }
}