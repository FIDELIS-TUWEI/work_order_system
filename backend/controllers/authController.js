require("dotenv").config();
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email");
const ErrorResponse = require("../utils/errorRespone");

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

        if (user) {
            res.status(201).json({
                success: true,
                message: "User created successfully"
            });

            // Send email notification
            const recepients = ["fideliofidel9@gmail.com"]
            const ccEmails = ["fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];

            const emailSubject = `New User successfully Created`;
            const emailText = `A user with Name ${user.firstName} ${user.lastName} has been created.`;

            const emailOptions = {
                email: recepients,
                cc: ccEmails,
                subject: emailSubject,
                text: emailText
            };

            // Send Email
            sendEmail(emailOptions);

        } else {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }

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
            signed: true,
            sameSite: 'None',
            domain: "work-orders.online",
            expires: cookieExpiry,
        });
        res.send();

        if (user && passwordIsMatch) {
            const { password, ...restParams } = user._doc
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: restParams,
                token,
                secret: 'eyrffvendbjf'
            })
        } else {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

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
const getUserInfo = asyncHandler (async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
            .populate("workOrders")
            .populate("department", "departmentName")
            .populate("designation", "designationName")

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500))
    }
});

// @desc Change User Password
// @route POST /hin/changePassword
// @access Private
const changePassword = asyncHandler(async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
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
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500))
    }
});



module.exports = {
    signupUser,
    login,
    logout,
    getUserInfo,
    changePassword
};