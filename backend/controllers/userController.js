const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Create New User
const addUser = asyncHandler( async (req, res) => {
    const user = req.body;
    
    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get All users
const getUsers = asyncHandler( async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get single User with unique Id
const getUser = asyncHandler( async (req, res) => {
    try {
        //const user = await User.find({ _id: req.params.id })
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit User with Unique Id
const editUser = asyncHandler( async (req, res) => {
    let user = req.body;
    const editUserDetails = new User(user);

    try {
        await User.updateOne({ _id: req.params.id }, editUserDetails);
        res.status(201).json(editUserDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Delete User
const deleteUser = asyncHandler( async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User deleted Succesfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

module.exports = {
    addUser,
    getUsers,
    getUser,
    editUser,
    deleteUser,
};