const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

// get All Users GET
const getAllUsers = asyncHandler ( async (req, res) => {
    const users = await User.find().select("-password").lean();
    if (!users) {
        return res.status(400).json({ message: "No users Found!" });
    }
    res.json(users);
});

// Create New User
const createNewUser = asyncHandler (async (req, res) => { 
    const { username, password, role } = req.body;

    // confirm data
    if (!username || !password || !Array.isArray(role) || !role.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check for duplicate user
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate Username" });
    }

    // Hash Password
    const hashedPswd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPswd, role };

    // Create and store user
    const user = await User.create(userObject);

    if (user) {
        return res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
})

// Update User PATCH 
const updateUser = asyncHandler (async (req, res) => {

});

const deleteUser = asyncHandler (async (req, res) => {

});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
}