const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/env");

const signToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES,
    });
}

// @desc Register User
const signupUser = asyncHandler (async (req, res) => {
    try {
        const { name, username } = req.body;
        const user = await User.findOne({ $or: [{ name }, { username }] });

        // Check for user in database
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = await User.create(req.body)

        // Create token
        const token = signToken(newUser._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            data: {
                user: newUser
            }
        });

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

        if (user && passwordIsMatch) {
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
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
    res.clearCookie("token", "", { httpOnly: true, expires: new Date(0), sameSite: 'none', secure: true });
    
    res.status(200).json({ success: true, message: "Logged Out successfully" });

    next();
};

// @desc Get user info
// @route GET /hin/userInfo
// @access Private
const getUserInfo = asyncHandler (async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                username: user.username
            }
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