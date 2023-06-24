const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

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
    process.env.JWT_SECRET,
    {expiresIn: process.env.LOGIN_EXPIRES}
    );

    // REFRESH TOKEN
    const refreshToken = jwt.sign(
        { "username": foundUser.username }, 
        process.env.REFRESH_TOKEN_SECRET,
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
        process.env.REFRESH_TOKEN_SECRET,
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
            process.env.JWT_SECRET,
            { expiresIn: '15min'}
            )

            res.json({ accessToken })
        })
    )
});

// Logout
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies) return res.status(204) // No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ message: "Successfully Logged" })
}

module.exports = {
    login,
    refresh,
    logout
}