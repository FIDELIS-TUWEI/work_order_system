const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { JWT_SECRET } = require("../utils/env");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return next(new ErrorResponse("Not authorized to access this route", 401));
        req.user = decoded.username.id;
        req.roles = decoded.UserInfo.isAdmin;
        next();
    })
}

module.exports = verifyJWT;