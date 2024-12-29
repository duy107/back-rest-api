const md5 = require("md5");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const Forgot = require("../../models/forgot-password.model");
const helperGenerate = require("../../helpers/generate");
const helperSendEmail = require("../../helpers/sendMail");
module.exports.login = async (req, res) => {
    const inforUser = await User.findOne({
        email: req.body.email
    }).select("fullName email phone address avatar tokenUser").lean();
    res.cookie("tokenUser", inforUser.tokenUser);
    const token = jwt.sign(inforUser, process.env.JWT_KEY, { expiresIn: "1d" });
    res.cookie("jwt_token", token);
    delete inforUser.tokenUser;
    res.json({
        code: 200,
        infor: inforUser
    })
}

module.exports.forgot = async (req, res) => {
    const email = req.body.email;
    const forgot = await Forgot.findOne({ email: email });
    const otp = helperGenerate.generateOtp(8);
    if (!forgot) {
        const objectForgot = {
            email: email,
            otp: otp,
            expireAt: Date.now() + 900000
        }
        const forgot = new Forgot(objectForgot);
        await forgot.save();
    }
    const subject = "Mã OTP xác thực mật khẩu";
    const content = `Mã OTP xác thực: <b>${otp}</b> (Hết hạn sau 3 phút)`;
    helperSendEmail.sendMail(email, subject, content);
    res.json({ code: 200 });
}
module.exports.otp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const forgot = await Forgot.findOne({
            email: email,
            otp: otp
        });
        if (!forgot) {
            res.json({
                code: 400,
                message: "Otp sai hoặc hết hạn!"
            })
        } else {
            res.json({
                code: 200
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}
module.exports.reset = async (req, res) => {
    try {
        const { email, password } = req.body;
        await User.updateOne({
            email: email
        }, {
            password: md5(password)
        })
        res.json({
            code: 200
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi hệ thống!"
        })
    }
}

module.exports.register = async (req, res) => {
    try {
        if (!req.body.avatar) {
            delete req.body.avatar;
        }
        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        await user.save();
        res.json({
            code: 200,
            message: "Đăng ký thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Đăng ký thất bại!"
        })
    }
}

module.exports.changeInfor = async (req, res) => {
    try {
        if (!req.body.password) {
            delete req.body.password
        } else {
            req.body.password = md5(req.body.password);
        }
        const token = req.cookies.tokenUser;
        await User.updateOne({
            tokenUser: token
        }, req.body);
        delete req.body.password
        res.json({
            code: 200,
            message: "Cập nhật thành công!",
            infor: req.body
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật thất bại!"
        })
    }
}

module.exports.infor = (req, res) => {
    res.json("OK");
}