const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

// check if user is authenticated
const auth = (req, res, next) => {
    const { token }= req.cookies;

    if (!token) {
        return res.status(401).send("Access Denied. Not authenticated!");
    }

    try {
        const jwtSecretKey = process.env.JWT_SECRET;
        const user= jwt.verify(token, jwtSecretKey);

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).send("Access Denied, Invalid auth token");
    }
}

// user profile
const isUser = (req, res, next) => {
    auth(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Access Denied! You are not authorized ")
        }
    });
};

// Admin
const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Forbidden! Not Authorized")
        }
    })
}

module.exports = {
    auth,
    isUser,
    isAdmin,
}