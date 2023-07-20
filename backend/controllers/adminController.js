const Manager = require("../model/managers");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");


// create a manager
const createManager = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, workOrders } = req.body;
    const checkExists = await Manager.findOne({ email });
    if (checkExists) {
        return next(new ErrorResponse("Email is Already Registered", 400));
    };

    const manager = new Manager({
        firstName,
        lastName,
        email,
        password,
        workOrders,
    });
    const result = await manager.save();
    res.status(201).json({
        success: true,
        data: {
            result
        }
    })
});

module.exports = {
    createManager,
}