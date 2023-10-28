const Department = require("../model/departments");
const asyncHandler = require("express-async-handler");

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
            return res.status(400).json({ message: "No departments found" });
        };

        res.status(200).json({
            success: true,
            data: departments,
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

// @desc Query all departments
const queryAllDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find({});

    if (!departments) {
      return res.status(400).json({ message: "No departments found" });
    };
    
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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
            return res.status(404).json({ message: "Department not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

module.exports = {
    createDepartment,
    getAllDepartments,
    queryAllDepartments,
    deleteDepartment
}