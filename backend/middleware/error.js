const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    // Handle Cast Error
    if (err.name === 'CastError') {
        const message = `Resource not found with ID of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Handle Axios Error (network error)
    if (err.name === "AxiosError") {
        const message = "Network Error, please Check your internet connection";
        error = new ErrorResponse(message, 500);
    };

    // Handle Duplicate field value
    if (err.code === 11000) {
        const field = Object.values(err.keyValue)[0];
        const message = `Duplicate ${field} value entered`;
        error = new ErrorResponse(message, 400);
    };

    // Handle validation error
    if (err.name === "ValidationError") {
        const errors = Object.keys(err.errors).map((key) => {
            return {
                field: key,
                message: err.errors[key].message
            };
        });
        error = new ErrorResponse(errors, 400);
    };

    res.status(error.statusCode).json({
        success: false,
        error: error.message
    });



    next();
};

module.exports = errorHandler;