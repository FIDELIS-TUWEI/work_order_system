const Employee = require("../model/employee.model");
const Work = require("../model/work.order.model");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const logger = require("../utils/logger");

// Create New Employee
const newEmployee = asyncHandler (async (req, res) => {
    try {
        const { firstName, lastName, username, phone } = req.body;
        // Check if employee exists
        const duplicate = await Employee.findOne({ username });
    
        if (duplicate) {
            return res.status(400).json({ error: "Employee already exists" });
        };
    
        // create new employee
        const newEmployee = new Employee({
            firstName,
            lastName,
            username,
            phone
        });
            
        if (newEmployee) {
            // Save the created employee and send mail notification
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
            return res.status(400).json({ error: "Invalid employee data" });
        };
    
        res.status(201).json(newEmployee);
    } catch (error) {
        Logger.error("Error in newEmployee controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all employees
const getEmployees = asyncHandler (async (req, res) => {
   try {
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
         return res.status(404).json({ error: "No employees data found" })
     }
 
     res.status(200).json({
         data: employees,
         page,
         pages: Math.ceil(count / pageSize),
         count
     });
   } catch (error) {
        logger.error("Error in getEmployees controller", error);
        res.status(500).json({ error: "Internal Server Error" });
   }
});

// Query all employees for selection in frontend
const queryEmployees = asyncHandler (async (req, res) => {
    try {
        const allEmployees = await Employee.find({});
    
        if (!allEmployees) {
            return res.status(404).json({ error: "Employees not found" });
        };
        
        res.status(200).json(allEmployees);
    } catch (error) {
        logger.error("Error in queryEmployees controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get single employee and populate workorders
const getEmployee = asyncHandler (async (req, res) => {
    try {
        const employeeId = req.params.id
        const employee = await Employee.findById(employeeId).populate("assignedWork");
    
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
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
        logger.error("Error in getEmployee controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Count the total number of employees
const countEmployees = asyncHandler (async (req, res) => {
    try {
        const employeeCount = await Employee.countDocuments();
    
        if (!employeeCount) {
            return res.status(404).json({ error: "Employees data count not found!" });
        };
    
        res.status(200).json(employeeCount);
    } catch (error) {
        logger.error("Error in countEmployees controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    };
});

// Edit Employee
const updateEmployee = asyncHandler (async (req, res) => {
    try {
        const { firstName, lastName, username, phone } = req.body;
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
    
        if (!employee) {
            return res.status(404).json({ error: `Employee with ID: ${employeeId} not found!` });
        }
    
        employee.firstName = firstName || employee.firstName;
        employee.lastName = lastName || employee.lastName;
        employee.username = username || employee.username;
        employee.phone = phone || employee.phone;
    
        // save the employee
        await employee.save();
    
        return res.status(200).json(employee);

    } catch (error) {
        logger.error("Error in updateEmployee controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Employee
const deleteEmployee = asyncHandler (async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findByIdAndDelete(employeeId).populate("firstName lastName");

        if (!employee) {
            return res.status(404).json({ error: `Employee with ID: ${employeeId} not found` });
        }
        // Check if there was work assigned to the employee
        const workAssigned = await Work.find({ assignedTo: employeeId });
    
        if (workAssigned.length > 0) {
            // Remove associated work orders assigned
            await Work.deleteMany({ assignedTo: employeeId });
        };
    
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
    
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        logger.error("Error in deleteEmployee controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    newEmployee,
    getEmployees,
    queryEmployees,
    getEmployee,
    countEmployees,
    updateEmployee,
    deleteEmployee
};