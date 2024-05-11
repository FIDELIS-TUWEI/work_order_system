const Department = require("../model/departments");
const asyncHandler = require("express-async-handler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// @desc Post create departments
// @route POST /new/departments
// @access Private
const createDepartment = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Check for duplicate
    const duplicate = await Department.findOne({ departmentName: req.body.departmentName });
    if (duplicate) {
        const error = new CustomError("Department already exists!", 400);
        return next(error);
    };

    // create new department
    const newDepartment = new Department(req.body);
    
    if (!newDepartment) {
        const error = new CustomError("Failed to create new Department!", 400);
        return next(error);
    };

    // Save the created department
    await newDepartment.save();
    res.status(201).json({
        success: true,
        data: newDepartment
    });

    
}));

// @desc Get all departments
// @route GET /all-departments
// @access Private
const getAllDepartments = asyncHandler (asyncErrorHandler (async (req, res, next) => {
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
        const error = new CustomError("Departmets not found!", 404);
        return next(error);
    };

    res.status(200).json({
        success: true,
        data: departments,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// @desc Query all departments
const queryAllDepartments = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const departments = await Department.find({});

    if (!departments) {
        const error = new CustomError("Deaprtments not found!", 404);
        return next(error);
    };
    
    res.status(200).json({
      success: true,
      data: departments
    });
}));

// @desc Delete department
// @route DELETE /delete/department/:id
// @access Private
const deleteDepartment = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const departmentId = req.params.id;
    const deleteDepartment = await Department.findByIdAndDelete(departmentId);

    if (!deleteDepartment) {
        const error = new CustomError("Department with ID not found!", 404);
        return next(error);
    }

    return res.status(200).json({
        success: true,
        message: "Department deleted successfully"
    });
}))

module.exports = {
    createDepartment,
    getAllDepartments,
    queryAllDepartments,
    deleteDepartment
};