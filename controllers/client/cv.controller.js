const { fullInfor } = require("../../helpers/inforCv");
const Cv = require("../../models/cv.model");
module.exports.create = async (req, res) => {
    try {
        const data = req.body;
        data.description?.trim() === "" && delete data.description;
        const cv = new Cv(data);
        await cv.save();
        res.json({
            code: 200,
            message: "Tạo thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo thất bại!"
        })
    }
}

module.exports.getByIdUser = async (req, res) => {
    const {id, status} = req.params;
    try {
        const option = {
            user_id: id,
            // deleted: false 
        }
        if(status != "all"){
            option.status = status;
        }
        const listCv = await Cv.find(option).lean();
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