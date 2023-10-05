const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const Cookies = require("js-cookie");

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
            email: user.email,
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

        if (!user?.active) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        const passwordIsMatch = await bcrypt.compare(password, user.password);

        if (!passwordIsMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        // Generate Token
        const token = signToken(user._id);

        // Set cookie expiration to 7 days
        const cookieExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // Send Http-Only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            signed: false,
            sameSite: 'None',
            expires: cookieExpiry,
        });

        // Save the cookie expiration in browser's cookies using js-cookie
        Cookies.set("cookieExpiry", cookieExpiry.toISOString(), {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: cookieExpiry
        })

        if (user && passwordIsMatch) {
            const { password, ...restParams } = user._doc
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: restParams,
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

// @desc Reset user password
// @route POST /hin/forgotPassword
// @access Private
const forgotPassword = asyncHandler (async (req, res, next) => {
    // 1. Get user based on email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    };

    // 2. Generate a random reset token
    const resetToken = user.createResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // 3. Send the token to user email
    const resetUrl = `${req.protocol}://${req.get("host")}/hin/resetPassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please use this link to reset your password: 
        \n\n ${resetUrl}\n\nThis link is valid for only 10 minutes.
        \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset",
                text: message
            });

            res.status(200).json({ success: true, message: "Password reset link sent" });
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorResponse("There was an error sending the password reset email. Please Try again later", 500));
            
        }
});

// @desc Reset user password
// @route POST /hin/resetPassword
// @access Private
const resetPassword = asyncHandler (async (req, res, next) => {
    // 1. If the user exists, then check if the token is valid
    const token = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorResponse("Invalid Token or Token has Expired", 400));
    };

    // 2. If the token is valid, then set the new password
    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();

    // Save user
    await user.save();

    // 3. Log the user in, send JWT
    const loginToken = signToken(user._id);

    res.status(200).json({
        success: true,
        message: "Password reset successfully",
        token: loginToken
    })
});



module.exports = {
    signupUser,
    login,
    logout,
    getUserInfo,
    forgotPassword,
    resetPassword
}