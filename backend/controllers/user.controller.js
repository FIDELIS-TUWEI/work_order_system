const User = require("../model/user.model");
const Work = require("../model/work.order.model");
const sendEmail = require("../utils/email");
const asyncHandler = require("express-async-handler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Controller function to get all users
const getAllUsers = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    // Find users in DB
    const users = await User.find({}).select("-password")
        .populate("workOrders")
        .sort({ Date_Created: -1 })
        .skip(pageSize * (page -1))
        .limit(pageSize);
    
    if (!users) {
        const error = new CustomError("Users not found!", 404)
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: users,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Controller function to get single user
const singleUser = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Check if user id exists
    const userExists = await User.exists({ _id: req.params.id });

    if (!userExists) {
        const error = new CustomError("User not found!", 404);
        return next(error);
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
    });
}));

// Controller function to edit user
const editUser = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // update user
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
        const error = new CustomError("User not found!", 404);
        return next(error);
    }

    res.status(200).json({ 
        success: true,
        message: `User updated succesfully` 
    });
}));

// Controller function to Delete User
const deleteUser = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
        const error = new CustomError("User with ID not found!", 404);
        return next(error);
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
}));

// Controller function to count all users
const countAllUsers = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const totalUsers = await User.countDocuments();

    if (!totalUsers) {
        const error = new CustomError("No data for Total users count!", 404)
        return next(error)
    }
    
    res.status(200).json({ 
        success: true,
        data: totalUsers 
    });
}));

// Controller function to count all users active
const countActiveUsers = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const activeUsersCount = await User.countDocuments({ active: true });

    if (!activeUsersCount) {
        const error = new CustomError("No data for active users count!", 404);
        return next(error);
    }
    
    res.status(200).json({ 
        success: true,
        data: activeUsersCount 
    });
}));


module.exports = {
    getAllUsers,
    singleUser,
    editUser,
    deleteUser,
    countAllUsers,
    countActiveUsers
};