module.exports.auth = async (req, res) =>{
    const token = req.headers.authorization.split(" ")[1];
    // res.cookie("token", token);
    // console.log(req.cookies.token);
    res.json({
        code: 200,
        token: token
    })
}