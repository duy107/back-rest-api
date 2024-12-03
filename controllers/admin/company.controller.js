const md5 = require("md5");
const Company = require("../../models/company.model");
const Role = require("../../models/role.model");
module.exports.login = async (req, res) => {
    const {email} = req.body;
    const company = await Company.findOne({email: email}).select("token role_id");
    const role = await Role.findOne({_id: company.role_id}).select("permissions");
    res.cookie("token", company.token);
    res.json({
        code: 200,
        message: "Login success",
        permissions: role.permissions
    })
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

module.exports.account = async (req, res) => {
    try {
        const account = await Company.find({deleted: false}).select("role_id name email").lean();
        for(const acc of account){
            const role = await Role.findOne({_id: acc.role_id}).select("title");
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