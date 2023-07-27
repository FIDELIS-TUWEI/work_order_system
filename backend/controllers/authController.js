const User = require("../model/user");
const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { JWT_SECRET, LOGIN_EXPIRES, REFRESH_TOKEN, ACCESS_TOKEN } = require("../utils/env");


// @desc Register User
const register = asyncHandler (async (req, res, next) => {
    const { username } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
        return next(new ErrorResponse("Username is Already Registered", 400));
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
})

// Login User
{/*const login = asyncHandler (async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Validation
        if (!username) {
            return next(new ErrorResponse("Please Add a username", 403));
        }
        if (!password) {
            return next(new ErrorResponse("Please Add a Password", 403));
        }

        // Check If Username exists
        const user = await User.findOne({ username });
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 400));
        }

        // Check If password Matches in DB
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid Credentials", 400));
        }

        // token response
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
});

// Send Token Response
const sendTokenResponse = asyncHandler (async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role
        })
}); */}

// Logout
const logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
};


module.exports = {
    register,
    login,
    logout,
}