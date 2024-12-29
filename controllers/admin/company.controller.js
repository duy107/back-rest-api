const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Company = require("../../models/company.model");
const Role = require("../../models/role.model");
module.exports.login = async (req, res) => {
    const { email } = req.body;
    const company = await Company.findOne({ email: email }).select("token role_id");
    const role = await Role.findOne({ _id: company.role_id }).select("permissions").lean();
    res.cookie("token", company.token);
    const jwt_token  = jwt.sign(role, process.env.JWT_KEY, {expiresIn: "1d"});
    res.cookie("permission", jwt.sign(role, process.env.JWT_KEY, {expiresIn: "1d"}));
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        permissions: role.permissions
    })
}
module.exports.infor = (req, res) => {
    res.json(res.locals.company);
}

module.exports.update = async (req, res) => {
    try {
        if (req.body.id) {
            await Company.updateOne({
                _id: req.body.id
            }, {
                role_id: req.body.role_id
            })
        } else {
            const id = res.locals.company.id;
            await Company.updateOne({_id: id}, req.body);
        }
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

module.exports.account = async (req, res) => {
    try {
        const token = req. res.locals.company.token;
        const account = await Company.find({
            deleted: false,
            token: {$ne: token}
        }).select("role_id name email").lean();
        for (const acc of account) {
            const role = await Role.findOne({ _id: acc.role_id }).select("title");
            acc.role = role
        }
        res.json({
            code: 200,
            data: account
        })
    } catch (error) {
        res.json({
            code: 400
        })
    }
}

module.exports.accountCreate = async (req, res) => {
    try {
        req.body.password = md5(req.body.password);
        const account = new Company(req.body);
        await account.save();
        res.json({
            code: 200,
            message: "Tạo thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }

}

module.exports.accountDelete = async (req, res) => {
    try {
        const account_id = req.body.id;
        await Company.updateOne({ _id: account_id }, { deleted: true });
        res.status(200).json({
            message: "Thành công"
        })
    } catch (error) {
        res.status(404).json({});
    }
}

module.exports.accountUpdate = async (req, res) => {
    try {

    } catch (error) {
        res.status(404).json({
            message: "failed"
        })
    }
}