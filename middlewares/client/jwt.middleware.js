const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.demo = async (req, res, next) => {
    if(req.cookies?.jwt_token){
        const jwt_token = req.cookies.jwt_token;
        try {
            const decoded = jwt.verify(jwt_token, process.env.JWT_KEY);
            console.log(decoded);
            next();
        } catch (error) {
            res.status(401).json({
                message: new Error(error).message
            })
        }
        
    }else{
        res.status(401).json({
            message: "chua co token"
        })
    }
}