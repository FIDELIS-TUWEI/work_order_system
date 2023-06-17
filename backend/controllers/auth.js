const asyncHandler = require("express-async-handler");
const User = require('../model/user');
const ErrorResponse = require("../utils/errorResponse");
const generateAuthToken = require("../utils/generateAuthToken");


const signUp = asyncHandler (async (req, res, next) => {
   // check if username exists
   const { username } = req.body;
   const userExists = await User.findOne({username});

   if (userExists) {
       return next(new ErrorResponse("Username is already registered!", 400));
   }

   // create new user
   try {
       const user = await User.create(req.body);
       res.status(201).json({
           success: true,
           user
       });

   } catch (error) {
       console.log(error);
       next(error);
   }
});

const signIn = asyncHandler( async (req, res, next) => {
   try {
       const { username, password } = req.body;
       if (!username || !password) {
           return next(new ErrorResponse("Username and password is required", 400));
       }

       // check for username in DB
       const user = await User.findOne({username});
       if (!user) {
           return next(new ErrorResponse("Invalid credentials", 400));
       }

       // verify user password
       const isMatched = await user.comparePassword(password);
       if (!isMatched) {
           return next(new ErrorResponse("Invalid credentials", 400));
       }

       // generateToken
       generateToken(user, 200, res);

   } catch (error) {
       console.log(error);

       next(new ErrorResponse("Cannot Login, check your credentials!", 400));
   }
});

// generate Token logic
const generateToken = async (user, statusCode, res) => {
   const token = generateAuthToken(user);

   const options = {
       httpOnly: true,
       expiresIn: new Date(Date.now() + process.env.LOGIN_EXPIRES)
   };

   res
   .status(statusCode)
   .cookie("token", token, options)
   .json({ success: true, token })
};

// Logout User logic
const logout = (req, res, next) => {
   res.clearCookie("token");
   res.status(200).json({
       success: true,
       message: "Logged Out"
   });
};

// SingleUser
const singleUser = asyncHandler (async (req, res) => {
   try {
       const user = await User.findById(req.params.id);
       res.status(200).json({
           success: true,
           user
       });
   } catch (error) {
       next(error);

   }
});

// Get All users
const getAllUsers = asyncHandler (async (req, res,) => {
    try {
        // retrieve users from database
        const users = await User.find();

        // return users response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error occured while getting users" });
    }
});

// Update user
const updateUser = asyncHandler (async (req, res, next) => {
    try {
        const { name, username, role } = req.body
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name
        user.username = username
        user.role = role

        // save updated User
        await user.save();

        // Return updated user 
        return res.status(200).json(user);
    } catch (error) {
        return next(new ErrorResponse("Internal Server Error", 500));
    }
})

module.exports = {
   signUp,
   signIn,
   logout,
   singleUser,
   getAllUsers,
   updateUser,
}