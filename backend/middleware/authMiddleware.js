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

    if (authToken && authToken.startsWith("Bearer")) {
        token = authToken.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("You are not logged in!", 401));
    }

    //2. Validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);

    //3. If user still exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return next(new ErrorResponse("The user with the given token does not exist", 401));  
    }

    //4. If user changed password after token was issued
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    if (isPasswordChanged) {
        return next(new ErrorResponse("Password has been changed recently, please login again", 401));
    };

    //5. Allow the user to access the route
    req.user = user;

    next();
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
}

module.exports = {
    protect,
    restrict,
}