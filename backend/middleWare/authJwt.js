const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Protect unauthorised routes
const protect = asyncHandler( async(req, res, next) => {
    try {
        // check if token exists
        const token = req.cookies.token
        if(!token) {
            res.status(401);
            throw new Error("Not authorised, please login")
        }

        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // Get user id from token
        const user = await User.findById(verified.id).select("-password");

        // Query DB for user
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user
        next();

    } catch (error) {
        res.status(401);
        throw new Error("User not authorised");
    }
});

module.exports = protect;