const User = require("../model/user.model");
const Work = require("../model/work.order.model");
const sendEmail = require("../utils/email");
const asyncHandler = require("express-async-handler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Controller function to get all users
const getAllUsers = asyncHandler (async (req, res, next) => {
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
});

// Controller function to get single user
const getProfile = asyncHandler (async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username })
            .select("-password")
            .populate("workOrders")
            .populate("department", "departmentName")
            .populate("designation", "designationName")
            .lean();

        if (!user) return re.status(404).json({ error: "User not found!" });

        res.status(200).json(user);

    } catch (error) {
        logger.error("Error in getUserProfile controller", error);
        res.status(500).json({  error: "Internal Server Error" });
    };
});

// Controller function to edit user
const updateUser = asyncHandler (async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) return res.status(404).json({ error: "User not found!" });
    
        res.status(200).json({ message: `User updated succesfully` });

    } catch (error) {
        logger.error("Error in updateUser controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});

// Controller function to Delete User
const deleteUser = asyncHandler (async (req, res, next) => {
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
});

// Controller function to count all users
const countAllUsers = asyncHandler (async (req, res, next) => {
    const totalUsers = await User.countDocuments();

    if (!totalUsers) {
        const error = new CustomError("No data for Total users count!", 404)
        return next(error)
    }
    
    res.status(200).json({ 
        success: true,
        data: totalUsers 
    });
});

// Controller function to count all users active
const countActiveUsers = asyncHandler (async (req, res, next) => {
    const activeUsersCount = await User.countDocuments({ active: true });

    if (!activeUsersCount) {
        const error = new CustomError("No data for active users count!", 404);
        return next(error);
    }
    
    res.status(200).json({ 
        success: true,
        data: activeUsersCount 
    });
});


module.exports = {
    getAllUsers,
    getProfile,
    updateUser,
    deleteUser,
    countAllUsers,
    countActiveUsers
};