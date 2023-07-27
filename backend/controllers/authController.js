const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const { generateToken } = require("../utils/generateToken");


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
});

// @desc Auth user & get token
// @route POST /hin/login
// @access Public

const login = asyncHandler (async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await user.comparePassword(password))) {
            generateToken(res, user._id);

            res.json({
                success: true,
                message: "User logged in successfully"
            })
        } else {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
    } catch (error) {
        next(error);
    }
});

// @desc Logout User / clear cookie
// @route POST /hin/logout
// @access Public
const logout = (req, res, next) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    })
};


module.exports = {
    register,
    login,
    logout,
}