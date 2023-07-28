const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const util = require("util");

// check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    // Read token and check if user is authenticated
    const authToken = req.headers.authorization;
    let token;

    if (authToken && authToken.startsWith("bearer")) {
        token = authToken.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("You are not logged in!", 401));
    }

    // Validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

    next();
});

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