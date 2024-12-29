const CV = require("../../models/cv.model");
const Job = require("../../models/job.model");
const User = require("../../models/user.model");
module.exports.listCv = async (req, res) => {
    const id = res.locals.company.id;
    const listCv = await CV.find({
        deleted: false
    }).lean();
    if (listCv.length > 0) {
        for (const item of listCv) {
            const job = await Job.findOne({
                _id: item.job_id
            }).select("name status deleted");
            item.jobInfor = job;
            const user = await User.findOne(
                {
                    _id: item.user_id
                }
            ).select("fullName email phone");
            item.userInfor = user;
        }
    }
    res.json(listCv);
}

module.exports.changeStatus = async (req, res) => {
    try {
        const {type, id} = req.body; 
        await CV.updateOne({
            _id: id
        }, {status: type});
        res.json({
            code: 200
        })
    } catch (error) {
        res.json({code: 400});
    }
}

module.exports.delete = async (req, res) => {
    try {
        const cv_id = req.body.id;
        await CV.updateOne({
            _id: cv_id
        }, {deleted: true});
        res.status(200).json({
            message: "Xóa thành công!"
        })
    } catch (error) {
        res.status(400).json({
            message: "Xóa thất bại!"
        })
    }
}