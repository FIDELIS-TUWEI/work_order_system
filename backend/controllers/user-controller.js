const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

const signUp = asyncHandler (async (req, res, next) => {
    // check if username exists
    const { username } = req.body;
    const userExists = await User.findOne({username});

    if (userExists) {
        return next(new ErrorResponse("Username is already registered!", 400));
    }

    // create new user
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
});

const signIn = asyncHandler( async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(new ErrorResponse("Username and password is required", 400));
        }

        // check for username in DB
        const user = await User.findOne({username});
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // verify user password
        const isMatched = await User.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // generateToken
        generateToken(User, 200, res)
    } catch (error) {
        console.log(error);

        next(new ErrorResponse("Cannot Login, check your credentials!", 400));
    }
});

// generate Token logic
const generateToken = async (User, statusCode, res) => {
    const token = await User.jwtGenerateToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.LOGIN_EXPIRES)
    };

    res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token })
}

module.exports = {
    signUp,
    signIn
}