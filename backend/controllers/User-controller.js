const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

// Register
const registerUser = asyncHandler( async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username is already registered!" });
        }

        // create new user Instance
        user = new User({
            username,
            password
        });

        // Hash password before saving to DB
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await user.save();

        // Generate JWT Token
        const payload = {
            user: {
                id: user._id
            },
        };

        jwt.sign(
            payload,
            config.get("JWT_SECRET"),
            { expiresIn: config.get("LOGIN_EXPIRES") },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        )

        // Return success message
        res.status(201).json({ message: "User registered succesfully" });

    } catch (err) {
        next(err);
        return res.status(500).json({ message:'Server Error' });
    }
}); 

// Login

module.exports = {
    registerUser,
}