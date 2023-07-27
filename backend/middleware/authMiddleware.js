const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const JWT_SECRET = require("../utils/env")

// check if user is authenticated
const protect = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;
    
    // Make sure token exists
    if (token) {
        // Verify Token
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            return next(new ErrorResponse("Not authorized, token is invalid", 401));
        }
    } else {
        return next(new ErrorResponse("Not authorized, no token", 401));
    }
};

// Middleware for Admin
const isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse("Access Denied! You must be an admin", 401));
    }
    next();
}

module.exports = {
    protect,
    isAdmin,
}