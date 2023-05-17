const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");

// generateToken
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

// Create New User
const createUser = asyncHandler( async (req, res) => {
    const { username, password, roles } = req.body;

    // Confirm Data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for Duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10) // salt rounds;

    const userObject = { username, "password": hashedPassword, roles };

    // Create and store new user
    const user = await User.create(userObject);

    if (user) {// created
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

// Login User
const loginUser = asyncHandler( async(req, res) => {
    
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add email and password");
    }

    // Check if user exists
    const user = await User.findOne({email})

    // If user does not exist
    if (!user) {
        res.status(400);
        throw new Error("User does not exist, please sign up")
    }

    // User exist? check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate Token for user
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    // if user & password is correct
    if (user && passwordIsCorrect) {
        const { _id, name, email } = user;
        res.status(200).json({
            _id,
            name,
            email,
            token,
        });
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
});

// Logout User
const logOut = asyncHandler( async(req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: true,
        secure: true,
    });
    res.status(200).json({ message: "Succesfully Logged Out" })
});

// get All users
const getAllUsers = asyncHandler( async(req, res) => {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
        return res.status(400).json({message: 'No Users Found!'})
    }
    res.json(users);
});

// Get Login Status
const loginStatus = asyncHandler( async(req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json(false);
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return res.json(true);
    } else {
        return res.json(false);
    }
});

// Update User
const updateUser = asyncHandler( async(req, res) => {
    const { id, username, roles, active, password } = re.body;

    // confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(id).exec();
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updateUser = await User.save();

    res.json({ message: `${updateUser.username} updated` })
});

// Delete User
const deleteUser = asyncHandler( async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const task = await Task.findOne({ user: id }).lean().exec();

    if (task?.length) {
        return res.status(400).json({ message: 'User has assigned Task' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    createUser,
    loginUser,
    logOut,
    getAllUsers,
    loginStatus,
    updateUser,
    deleteUser,
};