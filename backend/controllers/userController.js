const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// get All users
const getUsers = asyncHandler( async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        next(err);
    }
});

// Get single User with unique Id
const getUser = asyncHandler( async (req, res, next) => {
    try {
        //const user = await User.find({ _id: req.params.id })
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(err);
    }
});

// Edit User with Unique Id
const editUser = asyncHandler( async (req, res, next) => {
    try {
        const editUserDetails = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(201).json(editUserDetails);
    } catch (error) {
        next(err);
    }
});

// Delete User
const deleteUser = asyncHandler( async (req, res, next) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "User deleted Succesfully" });
    } catch (error) {
        next(err);
    }
})

module.exports = {
    getUsers,
    getUser,
    editUser,
    deleteUser,
};