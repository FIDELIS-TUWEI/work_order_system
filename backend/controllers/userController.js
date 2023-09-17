const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

// Controller function to get all users
const getAllUsers = asyncHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find({}).sort({ createdAt: -1 }).select("-password").populate("workOrders")
            .skip(pageSize * (page -1))
            .limit(pageSize)
        res.status(200).json({
            success: true,
            data: users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
        next();
    } catch (error) {
        next(error);
    }
});

// Controller function to get single user
const singleUser = asyncHandler (async (req, res, next) => {
    try {
        // find user by ID
        const user = await User.findById(req.params.id).select("-password").populate("workOrders").lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error);
    }
});

// Controller function to edit user
const editUser = asyncHandler (async (req, res, next) => {
    try {
        // update user
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            success: true,
            message: `User updated succesfully` 
        });
    } catch (error) {
        next(error);
    }
});

// Controller function to Delete User
const deleteUser = asyncHandler (async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) {
            return res.status(500).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: `User with username ${user.username} deleted`
        });
        next();
    } catch (error) {
        return next(error);
    }
    
});

// Controller function to count all users
const countAllUsers = asyncHandler (async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})


module.exports = {
    getAllUsers,
    singleUser,
    editUser,
    deleteUser,
    countAllUsers,
};