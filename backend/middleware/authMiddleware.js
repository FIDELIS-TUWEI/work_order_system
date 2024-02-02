const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const cache = require("memory-cache");
const ErrorResponse = require("../utils/errorRespone");

// check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(new ErrorResponse("Token is missing", 401));
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
            return next(new ErrorResponse("You are not authorized to access this route", 403));
        }

        // User has the required role, ptoceed to the next middleware or route
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
});

// Middleware to set the reviewedBy field
const setVerifiedBy = asyncHandler(async (req, res, next) => {
    req.body.verifiedBy = req.user._id;
    next();
});

// Cache middleware
const cacheMiddleware = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        return res.send(cachedResponse);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cache.put(key, body, 10000);
            res.sendResponse(body);
        };
    }

    next();
}

module.exports = {
    protect,
    restrict,
    isAdmin,
    setVerifiedBy,
    cacheMiddleware
};