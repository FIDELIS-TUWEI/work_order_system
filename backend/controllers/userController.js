const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");


const getAllUsers = asyncHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find({}).sort({ createdAt: -1 }).select("-password")
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

const editUser = asyncHandler (async (req, res, next) => {
    try {
        // update user
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            success: true,
            message: `User with Username: ${user.username} updated succesfully` 
        });
    } catch (error) {
        next(error);
    }
});

// Delete User
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

// Task History
const createTaskHistory = asyncHandler (async (req, res, next) => {
    const { title, description, location, completedDate, taskStatus } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });

        if (!currentUser) {
            return next(new ErrorResponse("You must Log In", 401));
        } else {
            const addTaskHistory = {
                title,
                description,
                location,
                completedDate,
                taskStatus,
                user: req.user._id
            }

            currentUser.taskHistory.push(addTaskHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            data: currentUser
        })
    } catch (error) {
        return next(error)
    }
})


module.exports = {
    getAllUsers,
    singleUser,
    editUser,
    deleteUser,
    createTaskHistory
};