const User = require("../models/userModel");
const createError = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


// admin register user
const register = asyncHandler( async (req, res, next) => {
    try {
        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created")
    } catch (err) {
        next(err);
    }
});

// login user with jwt token
const login = asyncHandler( async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong Password or username!"));
        }

        // generate Token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // send HTTP cookie
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookies("access_token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin })
    } catch (err) {
       next(err); 
    }
});

module.exports = {
    register,
    login,
}