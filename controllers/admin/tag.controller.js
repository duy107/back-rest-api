const Tag = require("../../models/tag.model");
module.exports.listTag = async (req, res) => {
    try {
        const listTag = await Tag.find({
            deleted: false
        }).select("name");
        res.json({
            code: 200,
            listTag: listTag
        })
    } catch (error) {
        res.json({
            code: 400
        })
    }
}