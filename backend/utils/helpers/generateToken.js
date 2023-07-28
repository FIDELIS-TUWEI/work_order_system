const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../env");

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // more secure
        secure: NODE_ENV !== "development", // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        //expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return token;
}

module.exports = {
    generateToken
}