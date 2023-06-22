const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createNewUser = asyncHandler (async (req, res, next) => {
    try {
        const { name, username, password } = req.body;

        // Validate request
        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

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
        res.status(201).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
});

const getAllUsers = asyncHandler (async (req, res, next) => {
    res.send("All users");
});

const singleUser = asyncHandler (async (req, res, next) => {
    try {
        // find user by ID
        const user = await User.findById(req.params.id).select("-password").lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
});

const updateUser = asyncHandler (async (req, res, next) => {
    try {
        const {id} = req.params;
        const { username, role, active } = req.body;

        // update user
        const userUpdate = await User.findByIdAndUpdate(id, {username, role, active});
        if (!userUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: `Username ${userUpdate.username} updated succesfully` });
    } catch (error) {
        next(error);
    }
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