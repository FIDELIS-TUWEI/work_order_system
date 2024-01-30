const Employee = require("../model/employee");
const Work = require("../model/workOrder");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/email");

// Create New Employee
const newEmployee = asyncHandler ( async (req, res) => {
    try {
        // Check if employee exists
        const duplicate = await Employee.findOne({ employeeName: req.body.username });

        if (duplicate) {
            res.status(400);
            throw new Error("Employee already exists");
        };

        // create new employee
        const newEmployee = new Employee(req.body);
         
        if (newEmployee) {
            // Save the created employee
            await newEmployee.save();

            // Send email notification
            const recepients = ["fideliofidel9@gmail.com"];
            const ccEmails = [
                "fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", 
                "joel.njau@holidayinnnairobi.com", "solomon.ouma@holidayinnnairobi.com"
            ];

            const emailSubject = `New employee created`;
            const emailText = `An employee with name ${newEmployee.firstName} ${newEmployee.lastName} has been created.`;

            const emailOptions = {
                email: recepients,
                cc: ccEmails,
                subject: emailSubject,
                text: emailText
            };

            // Send Email
            sendEmail(emailOptions);

        } else {
            res.status(400);
            throw new Error("Employee not created")
        };

        res.status(201).json({
            success: true,
            data: newEmployee
        });
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

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
            res.status(404);
            throw new Error("No employees found");
        }

        res.status(200).json({
            success: true,
            data: employees,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Query all employees for selection in frontend
const queryAllEmployees = asyncHandler(async (req, res) => {
    try {
        const allEmployees = await Employee.find({});

        if (!allEmployees) {
            res.status(400);
            throw new Error("No employees found");
        };
        
        res.status(200).json({
            success: true,
            data: allEmployees
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

// Get single employee and populate workorders
const singleEmployee = asyncHandler (async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate("assignedWork");

        if (!employee) {
            res.status(404);
            throw new Error("Employee not found");
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
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Count the total number of workorders assigned to an employee
const countWorkAssigned = asyncHandler (async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate("assignedWork");
        
        if (!employee) {
            res.status(404);
            throw new Error("Employee not found");
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
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Count the total number of employees
const countEmployees = asyncHandler (async (req, res) => {
    try {
        const employeeCount = await Employee.countDocuments();

        if (!employeeCount) {
            res.status(404);
            throw new Error("No employees found");
        };

        res.status(200).json({
            success: true,
            data: employeeCount
        })
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        
    }
});

// Get employee info
const getEmployeeInfo = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId).populate("assignedWork");

        if (!employee) {
            res.status(404);
            throw new Error("Employee not found");
        }

        res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Edit Employee
const editEmployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { ...updateFields } = req.body;
        const updateEmployee = await Employee.findByIdAndUpdate(employeeId, updateFields, { new: true });

        if (!updateEmployee) {
            res.status(404);
            throw new Error("Employee not found");
        }


        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId).populate("firstName lastName");

        if (!deletedEmployee) {
            res.status(404);
            throw new Error("Employee not found");
        }

        // Check if there was work assigned to the employee
        const workAssigned = await Work.find({ assignedTo: employeeId });

        if (workAssigned.length > 0) {
            // Remove associated work orders assigned
            await Work.deleteMany({ assignedTo: employeeId });
        }

        // Send email notification
        const recepients = ["fideliofidel9@gmail.com"]
        const ccEmails = [
            "fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", 
            "joel.njau@holidayinnnairobi.com"
        ];

        const emailSubject = `Employee deleted successfully`;
        const emailText = `An employee with name ${deletedEmployee.firstName} ${deletedEmployee.lastName} has been deleted.`;

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
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

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