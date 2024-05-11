const keyGenerator = require("./keyGenerator");

const addKey = (req, res, next) => {
    req.key = keyGenerator(req, res);

    next()
}

const unknownEndpoint = (req, res) => {
    res.status(400).json({ error: "Unknown Endpoint reached!" });
};

module.exports = {
    addKey,
    unknownEndpoint
};