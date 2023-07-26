const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../utils/env");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: "Not authorized to access this route"
                })
            } else {
                req.body.userId = decoded.id;
                next();
            }
            
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Not authorized to access this route"
        })
    }
}

module.exports = {auth}