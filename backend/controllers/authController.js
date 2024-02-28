const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email");
const createSecretToken = require("../utils/secretToken");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

// @desc Register User
const signupUser = asyncHandler (asyncErrorHandler (async (req, res) => {
    // check for existing user
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        const error = new CustomError("User already exists!", 400);
        return next(error);
    };

    // create new user
    const user = await User.create(req.body);

    if (user) {
        res.status(201).json({
            success: true,
            message: "User created successfully"
        });

        // Send email notification
        const recepients = ["fidel.tuwei@holidayinnnairobi.com"]
        const ccEmails = ["peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];

        const emailSubject = `New User successfully Created`;
        const emailText = `A user with Name ${user.firstName} ${user.lastName} has been created.
        
            Thank you,
            Holiday Inn Work Order System - All rights reserved.
        `;

        const emailOptions = {
            email: recepients,
            cc: ccEmails,
            subject: emailSubject,
            text: emailText
        };

        // Send Email
        sendEmail(emailOptions);
    }  else {
        const error = new CustomError("Failed to create new User!", 400);
        return next(error);
    };
}));

// @desc Auth user & get token
// @route POST /hin/login
// @access Public

const login = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const { username, password } = req.body;

    // Check user input
    if (!username || !password) {
        return res.json({ message: "All fields are required!" })
    };

    // Find user using their username in DB
    const user = await User.findOne({ username });

    if (!user) {
        const error = new CustomError("User not found!", 404)
        return next(error);
    };

    // check if password matches in DB
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
        const error = new CustomError("Incorrect password or username!", 401)
        return next(error);
    }

    // send token if username and password match DB
    if (user && passwordIsMatch) {
        //Generate Token
        const token = createSecretToken(user._id);
        user.token = token;

        // Send and store the token as HTTP-Only cookie
        res.cookie("token", token, {
            withCredentials: true,
            path: '/',
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            },
            token
        });

        next();
    } else {
        const error = new CustomError("Invalid Credentials!", 401)
        return next(error);
    }
}));

// @desc Logout user
// @route POST /hin/logout
// @access Private
const logout = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.status(204);
    res.clearCookie("token", "", { path: "/", httpOnly: true, expires: new Date(0), sameSite: 'None', secure: true });
    
    res.status(200).json({ 
        success: true, 
        message: "Logged Out successfully" 
    });

    next();
};

// @desc Get user info
// @route GET /hin/userInfo
// @access Private
const getUserInfo = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
        .populate("workOrders")
        .populate("department", "departmentName")
        .populate("designation", "designationName")

    if (!user) {
        const error = new CustomError("User not found!", 404);
        return next(error)
    }

    res.status(200).json({
        success: true,
        user
    });
    
}));

// @desc Change User Password
// @route POST /hin/changePassword
// @access Private
const changePassword = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    } else {
        const error = new CustomError("User password is required!", 400);
        return next(error);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true });

    // Send email notification
    const recepients = ["fideliofidel9@gmail.com"]
    const ccEmails = ["fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];

    const emailSubject = `Password Changed`;
    const emailText = `Password changed successfully for ${updateUser.username}`;

    const emailOptions = {
        email: recepients,
        cc: ccEmails,
        subject: emailSubject,
        text: emailText
    };
    
    // Send Email
    sendEmail(emailOptions);

    res.status(200).json({
        success: true,
        message: "Password changed successfully",
        updateUser
    });
}));

module.exports = {
    signupUser,
    login,
    logout,
    getUserInfo,
    changePassword
};