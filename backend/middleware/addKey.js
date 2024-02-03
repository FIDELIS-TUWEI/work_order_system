// middleware/addKey.js
const keyGenerator = require("../utils/keyGenerator");

module.exports = function addKey(req, res, next) {
    req.key = keyGenerator(req, res);
    next();
}
