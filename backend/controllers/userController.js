const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// generateToken
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

// Register User
const registerUser = asyncHandler( async (req, res) => {
    // register user with name, email, password
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all the required fields");
    }

    // password length check
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be upto 6 characters")
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

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

    // prerequisites to create user
    if (user) {
        const { _id, name, email, photo, phone, bio } = user;

        res.status(201).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            token,
        })
    } else {
        req.status(400)
        throw new Error("Invalid user data")
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
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        });
    } else {
        res.status(400)
        throw new Error("Ivalid email or password")
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

// get user Data
const getUser = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    } else {
        res.status(400);
        throw new Error("User not Found!")
    }
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
const updateUser = asyncHandler( async(req, res) => {});

module.exports = {
    registerUser,
    loginUser,
    logOut,
    getUser,
    loginStatus,
    updateUser,
};