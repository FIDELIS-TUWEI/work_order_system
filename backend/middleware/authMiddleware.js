const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

// check if user is authenticated
const isAuthenticated = asyncHandler (async (req, res, next) => {
    const {token} = req.cookies;

    // make sure token exists
    if (!token) {
        return next(new ErrorResponse("You must be logged in to access this Resource", 401));
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse("You must login to access this Resource", 401));
    }
});

module.exports = {
    isAuthenticated,
}