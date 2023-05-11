const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");

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
const updateUser = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, email, photo, phone, bio } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// Change Password
const changePassword = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password} = req.body;

    if (!user) {
        res.status(400)
        throw new Error("User not found, please signup")
    }

    // Validate
    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please add an old password")
    }

    // check if old password matches password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // Save new password
    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        res.status(200).send("Password change succesful");
    } else {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
});

// Forgot password controller
const forgotPassword = asyncHandler( async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    // Check if user does not exist
    if (!user) {
        res.status(404)
        throw new Error("User not found");
    }

    // Create Reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    // Hash token before saving to DB
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
        
        // Save Token to DB
        await new Token({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 30 * (60 * 1000) // expires after thirty minutes
        }).save()

        // Construct reset Url
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

        // Reset Email
        const message = `
            <h2>Hello ${user.name}</h2>
            <p>Please use the url below to reset your password</p>
            <p>This reset link is valid for only 30 minutes.</p>

            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

            <p>Regards.</p>
            <p>Holiday Inn IT Department</p>
        `;

        const subject = "Password reset request";
        const send_to = user.email;
        const sent_from = process.env.EMAIL_USER;

        try {
            await sendEmail(subject, message, send_to, sent_from);
            res.status(200).json({success: true, message: "Reset Email Sent"});
        } catch (error) {
            res.status(500);
            throw new Error("Email not sent, please try again");
        }
});

module.exports = {
    registerUser,
    loginUser,
    logOut,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
};