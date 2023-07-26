const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const JWT_SECRET = require("../utils/env")

// check if user is authenticated
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
};

// Middleware for Admin
const isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse("Access Denied! You must be an admin", 401));
    }
    next();
}

// check if user is authenticated
{/*const auth = (req, res, next) => {
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
}}*/}

// user profile
{/*const isUser = (req, res, next) => {
    auth(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Access Denied! You are not authorized ")
        }
    });
};*/}

// Admin
{/*const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("Forbidden! Not Authorized")
        }
    })
}*/}

module.exports = {
    isAuthenticated,
    isAdmin,
    //auth,
    //isUser,
    //isAdmin,
}