const User = require("../model/user");
const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { JWT_SECRET, LOGIN_EXPIRES, REFRESH_TOKEN } = require("../utils/env");


// @desc Register User
const register = asyncHandler (async (req, res, next) => {
    const { username } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
        return next(new ErrorResponse("Username is Already Registered", 400));
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
})

// Login User
{/*const login = asyncHandler (async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Validation
        if (!username) {
            return next(new ErrorResponse("Please Add a username", 403));
        }
        if (!password) {
            return next(new ErrorResponse("Please Add a Password", 403));
        }

        // Check If Username exists
        const user = await User.findOne({ username });
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 400));
        }

        // Check If password Matches in DB
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid Credentials", 400));
        }

        // token response
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
});

// Send Token Response
const sendTokenResponse = asyncHandler (async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role
        })
}); */}

// Logout
const logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
};

// User Profile
const userProfile = asyncHandler (async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password").populate("workOrders");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        next(error);
    }
})

// Login User
const login = asyncHandler (async (req, res) => {
    const { username, password } = req.body;

    // check requirements
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // Check for user in DB
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized! Enter correct username." })
    }

    // match password in DB
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json({ message: "Password Does not match" })
    }

    // access Token
    const accessToken = jwt.sign({
        "UserInfo": {
            "username": foundUser.username,
            "isAdmin": foundUser.isAdmin
        }
    },
    JWT_SECRET,
    {expiresIn: LOGIN_EXPIRES }
    );

    // REFRESH TOKEN
    const refreshToken = jwt.sign(
        { "username": foundUser.username }, 
        REFRESH_TOKEN,
        {expiresIn: '2d'}
    );

    // create Secure cookie with refresh Token
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accesible only by web server
        secure: true, // https
        sameSite: 'none', //cross-site cookie
        maxAge: 2 * 24 * 60 * 1000 // cookie expiry
    });

    // send access Token
    res.json({accessToken, message: "Login Success"});
});

// refresh token
const refresh = asyncHandler (async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        REFRESH_TOKEN,
        asyncHandler( async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden" })

            const foundUser = await User.findOne({ username: decoded.username }).exec()
            if (!foundUser) return res.status(401).json({ message: "Unauthorized" })

            const accessToken = jwt.sign({
                "UserInfo": {
                    "username": foundUser.username,
                    "isAdmin": foundUser.isAdmin
                }
            },
            JWT_SECRET,
            { expiresIn: '15min'}
            )

            res.json({ accessToken })
        })
    )
});

// Logout
{/*const logout = (req, res,) => {
    const cookies = req.cookies
    if (!cookies) return res.status(204) // No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ message: "Successfully Logged" })
}*/}

module.exports = {
    register,
    login,
    refresh,
    logout,
    userProfile
}