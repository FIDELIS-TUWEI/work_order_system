const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const JWT_SECRET = require("../utils/env")

// check if user is authenticated
const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return next(new ErrorResponse("Not authorized, please login", 401));
        } 

        // Verify token
        const verified = jwt.verify(token, JWT_SECRET);
        // Get user id from token
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            return next(new ErrorResponse("User not found", 401));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized, please login", 401));
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