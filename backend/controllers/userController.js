const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Create New User
const addUser = asyncHandler( async (req, res) => {
    const user = req.body;
    
    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Login User
const loginUser = asyncHandler( async (req, res) => {
    res.send("Login user")
});

// Logout User
const logOut = asyncHandler( async (req, res) => {
    res.send("Log Out")
});

// get All users
const getUsers = asyncHandler( async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Get Login Status
const loginStatus = asyncHandler( async (req, res) => {
    res.status("logged in")
});

// Update User
const updateUser = asyncHandler( async (req, res) => {
    res.send("User updated")
});

// Delete User
const deleteUser = asyncHandler( async (req, res) => {
    res.send("User deleted");
});

module.exports = {
    addUser,
    loginUser,
    logOut,
    getUsers,
    loginStatus,
    updateUser,
    deleteUser,
};