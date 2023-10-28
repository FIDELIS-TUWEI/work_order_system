const Designation = require('../model/designation');
const asyncHandler = require('express-async-handler');

// @desc Create designations
// @route POST /new/designations
// @access Private
const createDesignation = asyncHandler(async (req, res) => {
    try {
        const duplicate = await Designation.findOne({ designationName: req.body.designationName });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Designation already exists",
            });
        };

        // create new designation
        const newDesignation = new Designation(req.body);
        if (!newDesignation) {
            return res.status(400).json({
                success: false,
                message: "Designation not created",
            });
        }

        // Save the created designation
        await newDesignation.save();
        res.status(201).json({
            success: true,
            data: newDesignation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @desc Get all designations
// @route GET /all-designations
// @access Private
const getAllDesignations = asyncHandler(async (req, res) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Designation.find({}).estimatedDocumentCount();
    try {
        const designations = await Designation.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .exec();

        if (!designations) {
            return res.status(400).json({ message: "No designations found" });
        };

        res.status(200).json({
            success: true,
            data: designations,
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

// @desc query all designations
// @route GET /query/all-designations
// @access Private
const queryAllDesignations = asyncHandler(async (req, res) => {
    try {
        const designations = await Designation.find({});
        res.status(200).json({
            success: true,
            data: designations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @desc Delete designation
// @route DELETE /delete/designation/:id
// @access Private
const deleteDesignation = asyncHandler(async (req, res) => {
    try {
        const designationId = req.params.id;
        const designation = await Designation.findByIdAndDelete(designationId);
        if (!designation) {
            return res.status(400).json({
                success: false,
                message: "Designation not found",
            });
        };

        res.status(200).json({
            success: true,
            message: "Designation deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

module.exports = {
    createDesignation,
    getAllDesignations,
    queryAllDesignations,
    deleteDesignation
}