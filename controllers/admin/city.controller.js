const City = require("../../models/city.model");
module.exports.listCity = async (req, res) => {
    try {
        const listCity = await City.find({
            deleted: false
        }).select("name");
        res.json({
            code: 200,
            listCity: listCity
        })
    } catch (error) {
        res.json({  
            code: 400   
        })
    }
}