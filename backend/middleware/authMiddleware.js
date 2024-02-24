require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const cache = require("memory-cache");
const ErrorResponse = require("../utils/CustomError");

// check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    const authToken = req.cookies.token || req.headers.authorization

    if (!authToken) {
        return res.status(401).json({ success: false, message: "No token found!" })
    } 

    // Verify token
    jwt.verify(authToken, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Not authorized!" })
        } else {
            const user = await User.findById(data.id);
            req.user = user;
            next()
        }
    })
});

// Restrict users middleware
const restrict = (role) => {
    return async (req, res, next) => {
        const user = await User.findOne({ _id: req.user.id });
        if (!user || !role.includes(user.role)) {
            return next(new ErrorResponse("Forbidden, not authorized to access this route", 403));
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