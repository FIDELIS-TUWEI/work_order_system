const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../env");

const generateToken = (res, id) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        path: "/",
        httpOnly: true, // more secure
        secure: true, // Use secure cookies in production
        sameSite: 'none', // Prevent CSRF attacks
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        //maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return token
}

module.exports = {
    generateToken
}