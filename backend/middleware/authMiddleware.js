require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const cache = require("memory-cache");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

// check if user is authenticated
const protect = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const authToken = req.cookies.token || req.headers.authorization

    if (!authToken) {
        const error = new CustomError("No token found!", 401)
        return next(error);
    } 

    // Verify token
    jwt.verify(authToken, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            const error = new CustomError("Not authorized!", 401)
            return next(error);
        } else {
            const user = await User.findById(data.id);
            if (!user) {
                const error = new CustomError("User not found!", 401)
                return next(error);
            };

            req.user = user;
            next()
        }
    })
}));

// Restrict users middleware
const restrict = (role) => {
    return asyncErrorHandler (async (req, res, next) => {
        const user = await User.findOne({ _id: req.user.id });
        if (!user || !role.includes(user.role)) {
            const error = new CustomError("Forbidden! You are not authorized to access this route", 401)
            return next(error);
        }

        // User has the required role, ptoceed to the next middleware or route
        next();
    });
};

// Is admin middleware
const isAdmin = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user?.isAdmin) {
        const error = new CustomError("Forbidden! You are not authorized to access this route", 401)
        return next(error);
    }
    next();
}));

// Middleware to set the reviewedBy field
const setVerifiedBy = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    req.body.verifiedBy = req.user._id;
    next();
}));

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