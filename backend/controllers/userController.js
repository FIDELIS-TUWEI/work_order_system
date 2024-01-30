const User = require("../model/user");
const Work = require("../model/workOrder");
const sendEmail = require("../utils/email");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

// Controller function to get all users
const getAllUsers = asyncHandler (async (req, res) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find({}).select("-password")
            .populate("workOrders")
            .sort({ Date_Created: -1 })
            .skip(pageSize * (page -1))
            .limit(pageSize);
        
        if (!users) {
            res.status(404);
            throw new Error("No users found");
        }

        res.status(200).json({
            success: true,
            data: users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Controller function to get single user
const singleUser = asyncHandler (async (req, res, next) => {
    try {
        // Check if user id exists
        const userExists = await User.exists({ _id: req.params.id });

        if (!userExists) {
            res.status(404);
            throw new Error("User not found");
        };
        
        // find user by ID
        const user = await User.findById(req.params.id).select("-password")
            .populate("workOrders")
            .populate("department", "departmentName")
            .populate("designation", "designationName")
            .lean();

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Controller function to edit user
const editUser = asyncHandler (async (req, res) => {
    try {
        // update user
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json({ 
            success: true,
            message: `User updated succesfully` 
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Controller function to Delete User
const deleteUser = asyncHandler (async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndRemove(userId);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Check for work requested
        const workRequested = await Work.find({ requestedBy: userId });

        if (workRequested.length > 0) {
            // Remove associated work orders
            await Work.deleteMany({ requestedBy: userId });
        }

        // Send email notification
        const recepients = ["fideliofidel9@gmail.com"]
        const ccEmails = ["fidel.tuwei@holidayinnnairobi.com"];

        const emailSubject = `User deleted successfully`;
        const emailText = `A user with username ${user.username} has been deleted.`;

        const emailOptions = {
            email: recepients,
            cc: ccEmails,
            subject: emailSubject,
            text: emailText
        };

        // Send Email
        sendEmail(emailOptions);

        res.status(200).json({
            success: true,
            message: `User with username ${user.username} deleted`
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
    
});

// Controller function to count all users
const countAllUsers = asyncHandler (async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        
        res.status(200).json({ 
            success: true,
            data: totalUsers 
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Controller function to count all users active
const countActiveUsers = asyncHandler (async (req, res) => {
    try {
        const activeUsersCount = await User.countDocuments({ active: true });
        
        res.status(200).json({ 
            success: true,
            data: activeUsersCount 
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


module.exports = {
    getAllUsers,
    singleUser,
    editUser,
    deleteUser,
    countAllUsers,
    countActiveUsers
};