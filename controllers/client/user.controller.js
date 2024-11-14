const User = require("../../models/user.model");
const md5 = require("md5");
module.exports.login = async(req, res) => {
    // res.json({
    //     data: req.body
    // })
    const data = {
        email: "duytrinhcong107@gmail.com",
        password: md5("11111"),
        fullName: "Trinh cong duy"
    }
    const user = new User(data);
    await user.save();
    res.json({data: user})
}