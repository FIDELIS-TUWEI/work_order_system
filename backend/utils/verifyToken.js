const jwt = require("jsonwebtoken");
const createError = require("./error");


// Verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is Invalid"));
        req.user = user;
        next();
    });
}

// Verify user
const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorised!"));
        }
    });
};

//Verify Admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return(createError(403, "You are not authorised!"));
        }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
}