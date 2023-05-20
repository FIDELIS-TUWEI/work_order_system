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

// get All users
const getUsers = asyncHandler( async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Update User
const getUser = asyncHandler( async (req, res) => {
    try {
        //const user = await User.find({ _id: req.params.id })
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete User
const deleteUser = asyncHandler( async (req, res) => {
    res.send("User deleted");
});

module.exports = {
    addUser,
    getUsers,
    getUser,
    deleteUser,
};