const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

// check if user is authenticated
//const isAuthenticated = asyncHandler (async (req, res, next) => {
//    const {token} = req.cookies;

    // make sure token exists
//    if (!token) {
//        return next(new ErrorResponse("You must be logged in to access this Resource", 401));
//    }

//    try {
        // verify token
//        const decoded = jwt.verify(token, process.env.JWT_SECRET);
//        req.user = await User.findById(decoded.id);
 //       next();

//    } catch (error) {
 //       return next(new ErrorResponse("You must login to access this Resource", 401));
//    }
//});

const auth = (req, res, next) => {
    const token = req.headers("x-auth-token");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. Not authenticated!" });
    }

    try {
        const jwtSecretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwtSecretKey);

        req.user = decoded;
        next();
    } catch (error) {
        return next(new ErrorResponse("Invalid request, please login", 401));
    }
}

// user profile
const isUser = (req, res, next) => {
    auth(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "Access Denied! You are not authorized "})
        }
    });
};

// Admin
const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden! Contact your Admin" })
        }
    })
}

module.exports = {
    //isAuthenticated,
    auth,
    isUser,
    isAdmin,
}