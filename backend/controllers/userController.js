const asynHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asynHandler( async (req, res) => {
    // register user with name, email, password
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all the required fields");
    }

    // password length check
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be upto 6 characters")
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    // preequisites to create user
    if (user) {
        const { _id, name, email, photo, phone, bio } = user;

        res.status(201).json({
            _id, name, email, photo, phone, bio
        })
    } else {
        req.status(400)
        throw new Error("Invalid user data")
    }
});

module.exports = {
    registerUser
};