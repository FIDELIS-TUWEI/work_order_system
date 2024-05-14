const Department = require("../model/department.model");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");

// @desc Post create departments
const createDepartment = asyncHandler (async (req, res) => {
    try {
        // Check for duplicate
        const duplicate = await Department.findOne({ departmentName: req.body.departmentName });
        if (duplicate) {
            return res.status(400).json({ error: "Category already exists" });
        };
    
        // create new department
        const newDepartment = new Department(req.body);
    
        // Save the created department
        await newDepartment.save();

        res.status(201).json(newDepartment);

    } catch (error) {
        logger.error("Error in createDepartment controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

    
});

// @desc Get all departments
const getDepartments = asyncHandler (async (req, res) => {
    try {
        // Enable Pagination
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Department.find({}).estimatedDocumentCount();
        
        // Find departments
        const departments = await Department.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .exec();
        
        if (!departments) {
            return res.status(404).json({ error: "Departments not found" });
        };
    
        res.status(200).json({
            data: departments,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        logger.error("Error in getDepartments controller", error);
        re.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Query all departments
const queryDepartments = asyncHandler (async (req, res) => {
    try {
        const departments = await Department.find({});
    
        if (!departments) {
            return res.status(404).json({ error: "No departments found" });
        };
        
        res.status(200).json(departments);

    } catch (error) {
        logger.error("Error in queryDepartments controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Delete department
const deleteDepartment = asyncHandler (async (req, res) => {
    try {
        const departmentId = req.params.id;
        const deleteDepartment = await Department.findByIdAndDelete(departmentId);
    
        if (!deleteDepartment) {
            return res.status(404).json({ error: `Department with ID: ${departmentId} not found` });
        }
    
        res.status(200).json({ message: "Department deleted successfully" });

    } catch (error) {
        logger.error("Error in deleteCategory controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    createDepartment,
    getDepartments,
    queryDepartments,
    deleteDepartment
};