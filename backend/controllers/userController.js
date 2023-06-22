const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createNewUser = asyncHandler (async (req, res, next) => {
    try {
        const { name, username, password } = req.body;

        // check if user exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPswd = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, username, password: hashedPswd });
        await user.save();

        // Generate Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Return Token
        res.status(201).json({token});
    } catch (error) {
        
    }
});

const getAllUsers = asyncHandler (async (req, res, next) => {
    res.send("All users");
});

const singleUser = asyncHandler (async (req, res, next) => {
    res.send("Single User");
});

const updateUser = asyncHandler (async (req, res, next) => {
    res.send("User updated")
});

const deleteUser = asyncHandler (async (req, res, next) => {
    res.send("User deleted")
});

module.exports = {
    createNewUser,
    getAllUsers,
    singleUser,
    updateUser,
    deleteUser,
};