const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const util = require("util");

// SignInToken
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

// register user
const register = asyncHandler( async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        // jwt token
        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
            }
        })
    } catch (err) {
        next(err)
    }
});

// Login user
const login = asyncHandler( async (req, res, next) => {
    const { username, password } = req.body;

    // check if email is present in the request body
    if (!username || !password) {
        const err = res.status(400).json({ message:'Please provide username & password for login!'});
        return next(err);
    }

    // check if user exists 
    const user = await User.findOne({ username }).select('+password');

    //is password match in DB
    //const isMatch = await user.comparePasswordInDb(password, user.password);

    // check if user exists & password matches in Db
    if (!user || !(await user.comparePasswordInDb(password, user.password))) {
        const err = res.status(400).json({ message: 'Incorrect email or password!' });
        return next(err);
    }

    // assign token
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });


})

// get All users
const getUsers = asyncHandler( async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        next(err);
    }
});

// Get single User with unique Id
const getUser = asyncHandler( async (req, res, next) => {
    try {
        //const user = await User.find({ _id: req.params.id })
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(err);
    }
});

// Edit User with Unique Id
const editUser = asyncHandler( async (req, res, next) => {
    try {
        const editUserDetails = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(201).json(editUserDetails);
    } catch (error) {
        next(err);
    }
});

// Delete User
const deleteUser = asyncHandler( async (req, res, next) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "User deleted Succesfully" });
    } catch (error) {
        next(err);
    }
});

// auth protect functionality
const protect = asyncHandler( async (req, res, next) => {
    try {
      //Read token & check if it exists
        const testToken = req.headers.authorization;
        let token;

        if (testToken && testToken.startsWith('Bearer')) {
            token = testToken.split(' ')[1];
        }

        if (!token) {
            const err = res.status(401).json({ message: 'You are not logged in!' })
            next(err)
        }

    //Validate token
       const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

       console.log(decodedToken);
    //if the user exists
        const user = await User.findById(decodedToken.id);

        if (!user) {
            const err = res.status(401).json({ message: 'The user with the given token does not exist' });
            next(err);
        }

        const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat)
    //If user changed password after token was issued
       if (isPasswordChanged) {
            const err = res.status(401).json({ 
                message: 'The password has been changed recently.Please Login again!' 
            });
            return next(err);
       };

    //Allow user to access route  
        req.user = user;
    } catch (err) {
        next(err);
        
    }
});

// restricted route
const restrict = (role) => {
    return (req, res, next) => {
        
    }
}
module.exports = {
    register,
    login,
    getUsers,
    getUser,
    editUser,
    deleteUser,
    protect,
    restrict,
};