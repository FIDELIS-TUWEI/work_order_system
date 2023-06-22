const User = require("../model/user");
const asyncHandler = require("express-async-handler")

const createNewUser = asyncHandler (async (req, res, next) => {
    res.send("New User")
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