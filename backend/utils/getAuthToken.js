const jwt = require("jsonwebtoken");

const getAuthToken = (user) => {
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            username: user.username,
            isAdmin: user.isAdmin
        },
        secretKey
    );

    return token;
};

module.exports = getAuthToken;