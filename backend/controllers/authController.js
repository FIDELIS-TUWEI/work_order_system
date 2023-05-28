const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


// admin register user
const register = asyncHandler( async (req, res, next) => {
    const { name, username, password } = req.body;

    try {
          const user = await User.create({ name, username, password });
          res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

// login user with jwt token
const login = asyncHandler( async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(res.status(404).json({ message: "User not found" }));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return next(res.status(400).json({ message: "Wrong Password or username!"}) );
        }

        // generate Token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // send HTTP cookie
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin })
    } catch (err) {
       next(err); 
    }
});

// Logout logic
const logout = asyncHandler( async(req, res, next) => {
    try {
        res
            .cookie("access_token", "", {
                path: "/",
                httpOnly: true,
                expires: new Date(0),
                sameSite: "none",
                secure: true
            })
            .status(200)
            .json({ message: "Successfully logged Out!"})
    } catch (error) {
        next(err);
    }
});

module.exports = {
    register,
    login,
    logout,
}