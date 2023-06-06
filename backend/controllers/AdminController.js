const Admin = require("../models/AdminModel");
const signToken = require("../controllers/authController");
const asyncHandler = require("express-async-handler");

const AdminAuth = asyncHandler( async (req, res, next) => {
    const { username} = req.body;
    try {

        if (!username) {
            const err = res.status(400).json({ message: 'Unauthorised Access!' });
            return next(err);
        }

        const admin = await Admin.findOne({ username }).select('+password');
        
        // check if user exists & password matches in Db
    if (!admin || !(await Admin.comparePasswordInDb(password, Admin.password))) {
        const err = res.status(400).json({ message: 'Incorrect email or password!' });
        return next(err);
    }
        const token = signToken(admin._id);

        res.status(201).json({
            status: 'success',
            token
        })
    } catch (err) {
        next(err)
    }
    
});

module.exports = { AdminAuth };
