const Designation = require('../model/designation.model');
const asyncHandler = require('express-async-handler');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');

// @desc Create designations
// @route POST /new/designations
// @access Private
const createDesignation = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Check duplicate
    const duplicate = await Designation.findOne({ designationName: req.body.designationName });
    if (duplicate) {
        const error = new CustomError("Designation already exists!", 400);
        return next(error);
    };

    // create new designation
    const newDesignation = new Designation(req.body);
    if (!newDesignation) {
        const error = new CustomError("Failed to create new Designation!", 400);
        return next(error);
    }

    // Save the created designation
    await newDesignation.save();
    res.status(201).json({
        success: true,
        data: newDesignation
    });
}));

// @desc Get all designations
// @route GET /all-designations
// @access Private
const getAllDesignations = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Designation.find({}).estimatedDocumentCount();

    // Find designations
    const designations = await Designation.find({})
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();

    if (!designations) {
        const error = new CustomError("Designations not found!", 404);
        return next(error);
    };

    res.status(200).json({
        success: true,
        data: designations,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// @desc query all designations
// @route GET /query/all-designations
// @access Private
const queryAllDesignations = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const designations = await Designation.find({});

    if (!designations) {
        const error = new CustomError("Designations not found!", 404);
        return next(error)
    }

    res.status(200).json({
        success: true,
        data: designations
    });
}));

// @desc Delete designation
// @route DELETE /delete/designation/:id
// @access Private
const deleteDesignation = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const designationId = req.params.id;
    const designation = await Designation.findByIdAndDelete(designationId);

    if (!designation) {
        const error = new CustomError("Designation with ID not found!", 404);
        return next(error);
    };

    res.status(200).json({
        success: true,
        message: "Designation deleted successfully",
    });
}));

module.exports = {
    createDesignation,
    getAllDesignations,
    queryAllDesignations,
    deleteDesignation
};