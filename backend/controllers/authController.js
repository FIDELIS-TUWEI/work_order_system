const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/env");


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
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
            expiresIn: process.env.LOGIN_EXPIRES,
        })

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
        const token = generateToken(user._id);

        if (passwordIsMatch) {
            // Send Http-only cookie
            res.cookie("token", token, {
                path: "/",
                httpOnly: true, // more secure
                secure: true, // Use secure cookies in production
                sameSite: 'none', // Prevent CSRF attacks
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            })
        }

        if (user && passwordIsMatch) {
            const { _id, name, username, date } = user;
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: {
                    _id,
                    name,
                    username,
                    date,
                    token: token
                },
            })
        } else {
            return next(new ErrorResponse("Invalid Credentials", 400));
        }
    } catch (error) {
        next(error);
    }
});

// @desc Logout User / clear cookie
// @route POST /hin/logout
// @access Public
const logout = (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    });
    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    })
};


module.exports = {
    signupUser,
    login,
    logout,
}