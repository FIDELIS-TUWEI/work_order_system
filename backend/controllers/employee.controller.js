const Employee = require("../model/employee.model");
const Work = require("../model/work.order.model");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Create New Employee
const newEmployee = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Check if employee exists
    const duplicate = await Employee.findOne({ employeeName: req.body.username });

    if (duplicate) {
        const error = new CustomError("Employee already exists!", 400);
    return next(error);
    };

    // create new employee
    const newEmployee = new Employee(req.body);
        
    if (newEmployee) {
        // Save the created employee
        await newEmployee.save();

        // Send email notification
        const recepients = "fidel.tuwei@holidayinnnairobi.com";
        const ccEmails = [
            "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com", "solomon.ouma@holidayinnnairobi.com"
        ];

        const emailSubject = `New employee created`;
        const emailText = `An employee with name ${newEmployee.firstName} ${newEmployee.lastName} has been created.

            Thank you,
            Holiday Inn Work Order System - All rights reserved.
        `;

        const emailOptions = {
            email: recepients,
            cc: ccEmails,
            subject: emailSubject,
            text: emailText
        };

        // Send Email
        sendEmail(emailOptions);

    } else {
        const error = new CustomError("Failed to create new Employee!", 400);
        return next(error);
    };

    res.status(201).json({
        success: true,
        data: newEmployee
    });
}));

// Get all employees
const getAllEmployees = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Employee.find({}).estimatedDocumentCount();

    // Find employees
    const employees = await Employee.find({})
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();

    if (!employees) {
        const error = new CustomError("Employees not found!", 404);
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: employees,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Query all employees for selection in frontend
const queryAllEmployees = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const allEmployees = await Employee.find({});

    if (!allEmployees) {
        const error = new CustomError("Employees not found!", 404);
        return next(error)
    };
    
    res.status(200).json({
        success: true,
        data: allEmployees
    });
}))

// Get single employee and populate workorders
const singleEmployee = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).populate("assignedWork");

    if (!employee) {
        const error = new CustomError("Employee not found!", 404);
        return next(error)
    }

    // Get the total number of workorders assigned to the employee
    const totalWorkCount = employee.assignedWork.length;

    // count the total number of workorders assigned to the employee by status
    const pendingWorkCount = employee.assignedWork.filter(work => work.status === "Pending").length;
    const inProgressWorkCount = employee.assignedWork.filter(work => work.status === "In_Progress").length;
    const completedWorkCount = employee.assignedWork.filter(work => work.status === "Complete").length;
    const reviewedWorkCount = employee.assignedWork.filter(work => work.reviewed).length;

    res.status(200).json({
        success: true,
        data: {
            employee,
            totalWorkCount,
            pendingWorkCount,
            inProgressWorkCount,
            completedWorkCount,
            reviewedWorkCount
        }
    });
}));

// Count the total number of workorders assigned to an employee
const countWorkAssigned = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).populate("assignedWork");
    
    if (!employee) {
        const error = new CustomError("Employee not found!", 404);
        return next(error)
    };

    // Get the total number of workorders assigned to the employee
    const totalWorkCount = employee.assignedWork.length;

    // count the total number of workorders assigned to the employee by status
    const pendingWorkCount = employee.assignedWork.filter(work => work.status === "Pending").length;
    const inProgressWorkCount = employee.assignedWork.filter(work => work.status === "In_Progress").length;
    const completedWorkCount = employee.assignedWork.filter(work => work.status === "Complete").length;
    const reviewedWorkCount = employee.assignedWork.filter(work => work.reviewed).length;

    res.status(200).json({
        success: true,
        data: {
            totalWorkCount,
            pendingWorkCount,
            inProgressWorkCount,
            completedWorkCount,
            reviewedWorkCount
        }
    });
}));

// Count the total number of employees
const countEmployees = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const employeeCount = await Employee.countDocuments();

    if (!employeeCount) {
        const error = new CustomError("Employees not found!", 404);
        return next(error)
    };

    res.status(200).json({
        success: true,
        data: employeeCount
    })
    
}));

// Get employee info
const getEmployeeInfo = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId).populate("assignedWork");

    if (!employee) {
        const error = new CustomError("Employee not found!", 404);
        return next(error)
    }

    res.status(200).json({
        success: true,
        data: employee
    });
}));

// Edit Employee
const editEmployee = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const employeeId = req.params.id;
    const { ...updateFields } = req.body;
    const updateEmployee = await Employee.findByIdAndUpdate(employeeId, updateFields, { new: true });

    if (!updateEmployee) {
        const error = new CustomError("Employees not found!", 404);
        return next(error)
    }


    return res.status(200).json({
        success: true,
        message: "Employee updated successfully",
    });
    
}));

// Delete Employee
const deleteEmployee = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const employeeId = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId).populate("firstName lastName");

    if (!deletedEmployee) {
        const error = new CustomError("Employees not found!", 404);
        return next(error)
    }

    // Check if there was work assigned to the employee
    const workAssigned = await Work.find({ assignedTo: employeeId });

    if (workAssigned.length > 0) {
        // Remove associated work orders assigned
        await Work.deleteMany({ assignedTo: employeeId });
    }

    // Send email notification
    const recepients = "fidel.tuwei@holidayinnnairobi.com"
    const ccEmails = [
        "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"
    ];

    const emailSubject = `Employee deleted successfully`;
    const emailText = `An employee with name ${deletedEmployee.firstName} ${deletedEmployee.lastName} has been deleted.
    
        Thank you,
        Holiday Inn Work Order System - All rights reserved.
    `;

    const emailOptions = {
        email: recepients,
        cc: ccEmails,
        subject: emailSubject,
        text: emailText
    }

    // Send Email
    sendEmail(emailOptions);

    return res.status(200).json({
        success: true,
        message: "Employee deleted successfully"
    });
}));

module.exports = {
    newEmployee,
    getAllEmployees,
    queryAllEmployees,
    singleEmployee,
    countWorkAssigned,
    countEmployees,
    getEmployeeInfo,
    editEmployee,
    deleteEmployee
};