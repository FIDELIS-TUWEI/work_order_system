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

module.exports = {
    signUp,
}