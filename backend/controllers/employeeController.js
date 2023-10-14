const Employee = require("../model/employee");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// Create New Employee
const newEmployee = asyncHandler ( async (req, res) => {
    try {
        // Check if employee exists
        const duplicate = await Employee.findOne({ employeeName: req.body.username });

        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Employee already exists",
            });
        };

        // create new employee
        const newEmployee = new Employee(req.body);

        if (!newEmployee) {
            return res.status(400).json({
                success: false,
                message: "Employee not created",
            });
        };

        // Save the created employee
        await newEmployee.save();

        res.status(201).json({
            success: true,
            data: newEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// All employees
// Get all employees
const getAllEmployees = asyncHandler(async (req, res) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Employee.find({}).estimatedDocumentCount();

    try {
        const employees = await Employee.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .exec();

        if (!employees) {
            return res.status(400).json({ message: "No employees found" });
        }

        res.status(200).json({
            success: true,
            data: employees,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get single employee and populate workorders
const singleEmployee = asyncHandler (async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id).populate("assignedWork");
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        next(error);
    }
});

// Edit Employee
const editEmployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({
            success: true,
            data: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = {
    newEmployee,
    getAllEmployees,
    singleEmployee,
    editEmployee,
    deleteEmployee
};