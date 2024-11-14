const uploadToCloudinary = require("../../helpers/uploadCloudinary");

module.exports.upload = async (req, res, next) => {
        try {
            if (req.body.avatar) {
                const link = await uploadToCloudinary(req.body.avatar);
                req.body.avatar = link; 
            }
            next();
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
        }
    };