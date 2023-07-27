const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("./env");

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: NODE_ENV !== "development", // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    })
}

module.exports = {
    generateToken
}