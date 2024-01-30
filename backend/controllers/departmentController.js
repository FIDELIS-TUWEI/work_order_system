const Department = require("../model/departments");
const asyncHandler = require("express-async-handler");

// @desc Post create departments
// @route POST /new/departments
// @access Private
const createDepartment = asyncHandler(async (req, res) => {
    try {
        const duplicate = await Department.findOne({ departmentName: req.body.departmentName });
        if (duplicate) {
            res.status(400);
            throw new Error("Department already exists");
        };

        // create new department
        const newDepartment = new Department(req.body);
        if (!newDepartment) {
            res.status(400);
            throw new Error("Department not created");
        };

        // Save the created department
        await newDepartment.save();
        res.status(201).json({
            success: true,
            data: newDepartment
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// @desc Get all departments
// @route GET /all-departments
// @access Private
const getAllDepartments = asyncHandler(async (req, res) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Department.find({}).estimatedDocumentCount();
    try {
        const departments = await Department.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .exec();
        
        if (!departments) {
            res.status(404);
            throw new Error("No departments found");
        };

        res.status(200).json({
            success: true,
            data: departments,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// @desc Query all departments
const queryAllDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find({});

    if (!departments) {
      res.status(404);
      throw new Error("No departments found")
    };
    
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
});

// @desc Delete department
// @route DELETE /delete/department/:id
// @access Private
const deleteDepartment = asyncHandler(async (req, res) => {
    try {
        const departmentId = req.params.id;
        const deleteDepartment = await Department.findByIdAndDelete(departmentId);
        if (!deleteDepartment) {
            res.status(404);
            throw new Error("Department not found");
        }

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
    }
})

module.exports = {
    createDepartment,
    getAllDepartments,
    queryAllDepartments,
    deleteDepartment
};