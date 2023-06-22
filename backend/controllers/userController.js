const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const Task = require("../model/task");
const bcrypt = require("bcryptjs");

// get All Users GET
const getAllUsers = asyncHandler ( async (req, res) => {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
        return res.status(400).json({ message: "No users Found!" });
    }
    res.json(users);
});

// Create New User
const createNewUser = asyncHandler (async (req, res) => { 
    const { name, username, password, role } = req.body;

    // confirm data
    if (!name || !username || !password || !Array.isArray(role) || !role.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check for duplicate user
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate Username" });
    }

    // Hash Password
    const hashedPswd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { name, username, "password": hashedPswd, role };

    // Create and store user
    const user = await User.create(userObject);

    if (user) {
        return res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
})

// Update User PATCH 
const updateUser = asyncHandler (async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role, isAdmin } = req.body
        await User.findByIdAndUpdate(id, { role, isAdmin });
        const user = await User.findById(id);

        res.status(200).json({
            data: user,
        })
    } catch (error) {
        next(error);
    }
    


    res.json({ message: `${updatedUser.username} updated` });
});

const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID required" });
    }

    const task = await Task.findOne({ user: id }).lean().exec();

    if (task) {
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