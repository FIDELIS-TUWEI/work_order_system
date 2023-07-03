const User = require("../model/user");
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

const updateUser = asyncHandler (async (req, res, next) => {
    try {
        const {id} = req.params;
        const { username, role, active } = req.body;

        // update user
        const userUpdate = await User.findByIdAndUpdate(id, {username, role, active});
        if (!userUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: `User with Username: ${userUpdate.username} updated succesfully` });
    } catch (error) {
        next(error);
    }
});


module.exports = {
    getAllUsers,
    singleUser,
    updateUser,
};