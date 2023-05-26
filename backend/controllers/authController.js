const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")

export const register = asyncHandler( async (req, res, next) => {
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
})