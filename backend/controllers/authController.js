const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES,
    });
}

// @desc Register User
const signupUser = asyncHandler (async (req, res) => {
    try {
        // check for existing user
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // create new user
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
            active: user.active,
            department: user.department,
            designation: user.designation,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
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
    res.clearCookie("token", "", { path: "/", httpOnly: true, expires: new Date(0), sameSite: 'None', secure: true });
    
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
});

// @desc Update user password
// @route PUT /hin/updatePassword
// @access Private
const updatePassword = asyncHandler (async (req, res, next) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    // check if the user making the request is an admin or superadmin
    if (req.user.role !== "admin" || req.user.role !== "superadmin") {
        return next(new ErrorResponse("You are not authorized to change password, only admins", 401));
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        };

        // Hash the new password before saving to database
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;

        // save the user with the new password
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})


module.exports = {
    signupUser,
    login,
    logout,
    getUserInfo,
    updatePassword
}