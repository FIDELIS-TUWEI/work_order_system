const Department = require("../model/department");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// @desc Post create departments
// @route POST /new/departments
// @access Private
const createDepartment = asyncHandler(async (req, res) => {
    try {
        const duplicate = await Department.findOne({ departmentName: req.body.departmentName });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Department already exists",
            });
        };

        // create new department
        const newDepartment = new Department(req.body);
        if (!newDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department not created",
            });
        };

        // Save the created department
        await newDepartment.save();
        res.status(201).json({
            success: true,
            data: newDepartment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = {
    createDepartment
}