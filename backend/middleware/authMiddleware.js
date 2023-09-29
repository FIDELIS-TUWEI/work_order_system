const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const util = require("util");

// check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from the token
        const user = await User.findById(verified.id);

        if (!user) {
            return next(new ErrorResponse("User not found, please login", 401));
        }
        req.user = user;

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized, please login", 401));
    }

});

// Restrict users middleware
const restrict = (role) => {
    return async (req, res, next) => {
        const user = await User.findOne({ _id: req.user.id });
        if (!user || !role.includes(user.role)) {
            return next(new ErrorResponse("You are not authorized to access this route", 401));
        }
        next();
    };
};

// Is admin middleware
const isAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user?.isAdmin) {
        return next(new ErrorResponse("You are not authorized to access this route", 401));
    }
    next();
})

// Middleware to set the reviewedBy field
const setReviewedBy = asyncHandler(async (req, res, next) => {
    req.body.reviewedBy = req.user._id;
    next();
})

module.exports = {
    protect,
    restrict,
    isAdmin,
    setReviewedBy
}