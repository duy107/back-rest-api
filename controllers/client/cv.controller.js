const { fullInfor } = require("../../helpers/inforCv");
const Cv = require("../../models/cv.model");
module.exports.create = async (req, res) => {
    try {
        const data = req.body;
        data.description?.trim() === "" && delete data.description;
        data.project?.trim() === "" && delete data.project;
        const cv = new Cv(data);
        await cv.save();
        res.json({
            code: 200,
            message: "Create success!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Create falied!"
        })
    }
}

module.exports.getByIdUser = async (req, res) => {
    const used_id = req.params.id; 
    try {
        const listCv = await Cv.find({
            user_id: used_id,
            deleted: false,
            accepted: true
        }).lean();;
        const data = await fullInfor(listCv);
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        res.json({
            code: 400
        })
    }
}