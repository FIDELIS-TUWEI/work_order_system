const User = require("../model/user.model");
const Work = require("../model/work.order.model");
const sendEmail = require("../utils/email");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");

// Controller function to get all users
const getUsers = asyncHandler (async (req, res, next) => {
    try {
        // Enable Pagination
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const count = await User.find({}).estimatedDocumentCount();
    
        // Find users in DB
        const users = await User.find({}).select("-password")
            .sort({ Date_Created: -1 })
            .skip(pageSize * (page -1))
            .limit(pageSize);
        
        if (!users) return res.status(404).json({ error: "User not found!" });
    
        res.status(200).json({
            data: users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        logger.error("Error in getUsers controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});

const getUser = asyncHandler (async (req, res) => {
    try {
        // check if the user exists
        const userId = req.params.id; 
        const user = await User.findById(userId)
            .select("-password")
            .populate("department", "departmentName")
            .populate("designation", "designationName");

        if (!user) return res.status(404).json({ error: `User with user ID ${userId} not found` });

        res.status(200).json(user);
    } catch (error) {
        logger.error("Error in getUser controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
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

        if (!user) return res.status(404).json({ error: "User not found!" });

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
   try {
        const userId = req.params.id;
        const user = await User.findByIdAndRemove(userId);

        if (!user) return res.status(404).json({ errror: `User with ID: ${userId} not found!` })

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
        logger.error("Error in deleteUser controller", error);
        res.status(500).json({ error: "Internal Server Error" });
   };
});

// Controller function to count all users
const countUsers = asyncHandler (async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
    
        if (!totalUsers) return res.status(404).json({ error: "No data count for all users found" });
        
        res.status(200).json({ 
            success: true,
            data: totalUsers 
        });
    } catch (error) {
        logger.error("Error in countUsers controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});

// Controller function to count all users active
const countActiveUsers = asyncHandler (async (req, res, next) => {
    try {
        const activeUsersCount = await User.countDocuments({ active: true });
    
        if (!activeUsersCount) return res.status(404).json({ error: "No data count for active users found!" })
        
        res.status(200).json({ 
            success: true,
            data: activeUsersCount 
        });
    } catch (error) {
        logger.error("Error in countActiveUsers controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});


module.exports = {
    getUsers,
    getUser,
    getProfile,
    updateUser,
    deleteUser,
    countUsers,
    countActiveUsers
};