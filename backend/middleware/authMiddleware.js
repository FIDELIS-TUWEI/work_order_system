const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const util = require("util");

// check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    //1. Read token and check if user is authenticated
    const authToken = req.headers.authorization;
    let token;

    if (authToken && authToken.startsWith("bearer")) {
        token = authToken.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("You are not logged in!", 401));
    }

    //2. Validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3. If user still exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return next(new ErrorResponse("The user with the given token does not exist", 401));  
    }

    //4. If user changed password after token was issued
    if (user.isPasswordChanged(decodedToken.iat)) {
        return next(new ErrorResponse("Password has been changed recently, please login again", 401));
    };

    //5. Allow the user to access the route

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