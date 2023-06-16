const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

// check if user is authenticated
const isAuthenticated = asyncHandler (async (req, res, next) => {
    const {token} = req.cookies;

    // make sure token exists
    if (!token) {
        return next(new ErrorResponse("You must be logged in to access this Resource", 401));
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse("You must login to access this Resource", 401));
    }
});

// isAdmin middleware
const isAdmin = (req, res, next) => {
    // Check if user is authenticated and has admin role
    if (req.user && req.user.isAdmin) {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin, return unauthorized error
      res.status(401).json({ message: 'Unauthorized' });
    }
  };


module.exports = {
    isAuthenticated,
    isAdmin,
}