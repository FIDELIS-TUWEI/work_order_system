const Designation = require('../model/designation');
const asyncHandler = require('express-async-handler');

// @desc Create designations
// @route POST /new/designations
// @access Private
const createDesignation = asyncHandler(async (req, res) => {
    try {
        const duplicate = await Designation.findOne({ designationName: req.body.designationName });
        if (duplicate) {
            res.status(400);
            throw new Error("Designation already exists");
        };

        // create new designation
        const newDesignation = new Designation(req.body);
        if (!newDesignation) {
            res.status(400);
            throw new Error("Designation not created");
        }

        // Save the created designation
        await newDesignation.save();
        res.status(201).json({
            success: true,
            data: newDesignation
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
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
            res.status(404);
            throw new Error("No designations found");
        };

        res.status(200).json({
            success: true,
            data: designations,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// @desc query all designations
// @route GET /query/all-designations
// @access Private
const queryAllDesignations = asyncHandler(async (req, res) => {
    try {
        const designations = await Designation.find({});

        if (!designations) {
            res.status(404);
            throw new Error("Designations not found")
        }
        res.status(200).json({
            success: true,
            data: designations
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
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
            res.status(404);
            throw new Error("Designation not found");
        };

        res.status(200).json({
            success: true,
            message: "Designation deleted successfully",
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    createDesignation,
    getAllDesignations,
    queryAllDesignations,
    deleteDesignation
};