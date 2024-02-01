const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const cache = require("memory-cache");
const ErrorResponse = require("../utils/errorRespone");


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
    restrict,
    isAdmin,
    setVerifiedBy,
    cacheMiddleware
};