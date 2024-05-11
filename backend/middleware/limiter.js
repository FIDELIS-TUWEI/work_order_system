const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    max: 200,
    windows: 10 * 60 * 1000,
    message: "Too many requests from this IP. Please try again later!"
});

module.exports = limiter;