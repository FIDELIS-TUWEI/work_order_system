const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const createSecretToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    })
};

module.exports = createSecretToken;