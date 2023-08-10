const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES,
    });
}

// @desc Register User
const signupUser = asyncHandler (async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ $or: [{ username }] });

        // Check for user in database
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = await User.create(req.body)

        // Create token
        const token = signToken(newUser._id);

        // Send Http-Only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            signed: false,
            sameSite: 'None',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        if (user) {
            const {_id, firstName, lastName, role} = user;
            res.status(201).json({
                success: true,
                message: "User created successfully",
                _id,
                firstName,
                lastName,
                role,
                token
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc Auth user & get token
// @route POST /hin/login
// @access Public

const login = asyncHandler (async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passwordIsMatch = await user.comparePassword(password);

        // Generate Token
        const token = signToken(user._id);

        // Send Http-Only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            signed: false,
            sameSite: 'None',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        if (user && passwordIsMatch) {
            const {firstName, lastName, role} = user;
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user,
                token
            })
        } else {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
    } catch (error) {
        next(error);
    }
});

// @desc Logout user
// @route POST /hin/logout
// @access Private
const logout = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.status(204);
    res.clearCookie("token", "", { path: "/", httpOnly: true, expires: new Date(0), sameSite: 'none', secure: true });
    
    res.status(200).json({ success: true, message: "Logged Out successfully" });

    next();
};

// @desc Get user info
// @route GET /hin/userInfo
// @access Private
const getUserInfo = asyncHandler (async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password").populate("workOrders");

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
})


module.exports = {
    signupUser,
    login,
    logout,
    getUserInfo
}