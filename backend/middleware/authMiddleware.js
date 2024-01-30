const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const cache = require("memory-cache");

// check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Not authorized to access this route");
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from the token
        const user = await User.findById(verified.id);

        if (!user) {
            res.status(404);
            throw new Error("User not found, please login");
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(500);
        throw new ErrorResponse("Not authorized, please login");
    }

});

// Restrict users middleware
const restrict = (role) => {
    return async (req, res, next) => {
        const user = await User.findOne({ _id: req.user.id });
        if (!user || !role.includes(user.role)) {
            res.status(403);
            throw new Error("You are not authorized to access this route");
        }

        // User has the required role, ptoceed to the next middleware or route
        next();
    };
};

// Is admin middleware
const isAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user?.isAdmin) {
        res.status(401);
        throw new Error("You are not authorized to access this route");
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
        next();
    }
}

module.exports = {
    protect,
    restrict,
    isAdmin,
    setVerifiedBy,
    cacheMiddleware
};