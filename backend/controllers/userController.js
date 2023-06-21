const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const Task = require("../model/task");
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
    const { id, username, password, role, active } = req.body;

    // confirm data
    if (!id || !username || !Array.isArray(role) || !role.length || typeof active !== "boolean") {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(400).json({ message: "User not Found!" });
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    // update user
    user.username = username
    user.role = role
    user.active = active

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated` });
});

const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID required" });
    }

    const tasks = await Task.findOne({ user: id }).lean().exec();

    if (tasks?.length) {
        return res.status(400).json({ message: "User has assigned Tasks" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
}