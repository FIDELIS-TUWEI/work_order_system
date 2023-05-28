const jwt = require("jsonwebtoken");


// Verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(res.status(401).json({ message: "You are not authenticated" }));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(res.status(403).json({ message: "Token is Invalid" }));
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
            return next(res.status(403).json({ message: "You are not authorised!" }));
        }
    });
};

//Verify Admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return(res.status(403).json({ message: "You are not authorised!" }));
        }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
}