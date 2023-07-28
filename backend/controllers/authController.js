const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const { generateToken } = require("../utils/helpers/generateToken");


// @desc Register User
const signupUser = asyncHandler (async (req, res) => {
    try {
        const { name, username, password, date } = req.body;
        const user = await User.findOne({ $or: [{ name }, { username }] });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            name,
            username,
            password,
            date,
        })

        await newUser.save();

        // Generate Token
        const token = generateToken(res, newUser._id);

        if (newUser) {
            res.status(201).json({
                success: true,
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                date: newUser.date,
                token: token,
                message: "User created successfully"
            })
        } else {
            res.status(400).json({ message: "Invalid User Data" });
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

        if (user && (await user.comparePassword(password))) {
            // Generate Token
            const token = generateToken(res, user._id);

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token: token
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