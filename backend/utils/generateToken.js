const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const generateTokenAndSetCookie = (userId, res) => {
    const token =  jwt.sign({ userId }, config.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie("token", token, {
        withCredentials: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60, //MS
        htttpOnly: true, // prevent XSS attack cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: config.NODE_ENV !== "development"
    })
};

module.exports = generateTokenAndSetCookie;