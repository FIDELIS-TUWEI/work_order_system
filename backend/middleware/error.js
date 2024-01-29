const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    
    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({
        success: false,
        error: err.message
    });

    next();
};

module.exports = errorHandler;