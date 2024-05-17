const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../model/user.model");
const sendEmail = require("../utils/email");
const logger = require("../utils/logger");
const generateTokenAndSetCookie = require("../utils/generateToken");
const { SendWelcomeUserEmail } = require("../EmailService/welcomeUser");

// @desc Register User
const register = asyncHandler (async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        // 1. check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format!" })
        };

        // 2. Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already registered, please login!" });
        };

        // 3. check if email exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Email is already registered!" });
        };

        // check password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long!" });
        };

        // 4. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        });

        // 6. Check if all requirements are met
        if (newUser) {
            const savedUser = await newUser.save();

            res.status(201).json({ message: "User registered successfully" });

            // Send Email
            await SendWelcomeUserEmail({
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username
            });
        } else {
            res.status(400).json({ error: "Invalid user data!" });
        };

    } catch (error) {
        logger.error("Error in signup controller", error);
        req.status(500).json({ error: "Internal Server Error" });
    };
});

// @desc Auth user & get token
const login = asyncHandler (async (req, res) => {
try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
        .populate("department", "departmentName")
        .populate("designation", "designationName");

    // Check if password is correct with the one in DB
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
    };

    // generate token as cookie
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        user: {
            ...user._doc,
            password: undefined
        }
    });

} catch (error) {
    logger.error("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
}
});

// @desc Logout user
const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        logger.error("Error in logout controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
};

// @desc Get user info
const getMe = asyncHandler (async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .populate("department", "departmentName")
            .populate("designation", "designationName");

        res.status(200).json(user);

    } catch (error) {
        logger.error("Error in getMe controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});

// @desc Change User Password
// @route POST /hin/changePassword
// @access Private
const changePassword = asyncHandler (async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ error: "Please enter password!" })
        } 
    
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true });
    
        // Send email notification
        const recepients = ["fideliofidel9@gmail.com"]
        const ccEmails = ["fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];
    
        const emailSubject = `Password Changed`;
        const emailText = `Password changed successfully for ${updateUser.username}`;
    
        const emailOptions = {
            email: recepients,
            cc: ccEmails,
            subject: emailSubject,
            text: emailText
        };
        
        // Send Email
        sendEmail(emailOptions);
    
        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        logger.error("Error in changePassword controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});

module.exports = {
    register,
    login,
    logout,
    getMe,
    changePassword
};