const User = require("../model/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email");
const createSecretToken = require("../utils/generateToken");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const logger = require("../utils/logger");

// @desc Register User
const register = asyncHandler (async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        // 1. check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format!" })
        };

        // 2. Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already registered, please login!" });
        };

        // 3. check if email exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Email is already registered!" });
        };

        // check password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long!" });
        };

        // 4. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        });

        // 6. Check if all requirements are met
        if (newUser) {
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });

            // Send email notification
            const recepients = ["fidel.tuwei@holidayinnnairobi.com"]
            const ccEmails = ["peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];

            const emailSubject = `New User successfully Created`;
            const emailText = `A user with Name ${newUser.firstName} ${newUser.lastName} has been created.
            
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
        } else {
            res.status(400).json({ error: "Invalid user data!" });
        };

    } catch (error) {
        logger.error("Error in signup controller", error);
        req.status(500).json({ error: "Internal Server Error" });
    };
});

// @desc Auth user & get token
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

    } else {
        const error = new CustomError("Invalid Credentials!", 401)
        return next(error);
    }
}));

// @desc Logout user
// @route POST /hin/logout
// @access Private
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.status(204);
    res.clearCookie("token", "", { path: "/", httpOnly: true, expires: new Date(0), sameSite: 'None', secure: true });
    
    res.status(200).json({ 
        success: true, 
        message: "Logged Out successfully" 
    });

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
    register,
    login,
    logout,
    getUserInfo,
    changePassword
};