const jwt = require("jsonwebtoken");
const cache = require("memory-cache");
const asyncHandler = require("express-async-handler");

const User = require("../model/user.model");
const logger = require("../utils/logger");
const config = require("../utils/config");

// check if user is authenticated
const protect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // check if token exists
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token provided!" });
        };

        const decoded = jwt.verify(token, config.JWT_SECRET);

        // check if token is valid
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        };

        const user = await User.findById(decoded.userId).select("-password");

        // check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        };

        req.user = user;

        next();
    } catch (error) {
        logger.error("Error in protect middleware", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
});

// Restrict users middleware
const restrict = (role) => {
    return async (req, res, next) => {
        const user = await User.findOne({ _id: req.user.id });
        if (!user || !role.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden: You are not authorized to access this route!" });
        };

        // User has the required role, ptoceed to the next middleware or route
        next();
    };
};

// Is admin middleware
const isAdmin = asyncHandler (async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });
    if (!user?.isAdmin) {
        return res.status(403).json({ error: "Forbidden: You are not authorized to access this route!" });
    };

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
    cacheMiddleware
};