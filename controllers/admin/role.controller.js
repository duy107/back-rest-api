const Role = require("../../models/role.model");
module.exports = async (req, res) => {
    try {
        const roles = await Role.find({
            deleted: false
        }).select("title description permissions")
        res.json(
            {
                code: 200,
                roles
            }
        )
    } catch (error) {
        res.json({
            code: 400,
            message: "failed!"
        })
    }
}

module.exports.create = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.json({
            code: 200
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "error"
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const id = req.body._id;
        await Role.updateOne({_id: id}, {deleted: true});
        res.status(200).json({message: "success"});
    } catch (error) {
        res.status(400).json({message: "failed"});
    }
}
module.exports.update = async (req, res) => {
    try {
        const id = req.body.id;
        delete req.body.id;
        await Role.updateOne({_id: id}, req.body);
        res.json({
            code: 200
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "error"
        })
    }
}

module.exports.changePermission = async (req, res) => {
    try {
        for(const item of req.body.data) {
            const id = item.role_id;
            await Role.updateOne({_id: id}, {permissions: item.permissions});
        }
    } catch (error) {
        
    }
}