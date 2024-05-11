const Location = require("../model/location.model"); 
const asyncHandler = require("express-async-handler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// @desc Create locations
// @route POST /locations
// @access Private

const createLocation = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Check duplicate location
    const duplicate = await Location.findOne({ locationTitle: req.body.locationTitle });
    if (duplicate) {
        return res.status(400).json({
            success: false,
            message: "Location already exists",
        });
    };
    
    // Create new location
    const newWorkLocation = new Location(req.body);
    if (!newWorkLocation) {
        const error = new CustomError("Failed to create new Location!", 400);
        return next(error);
    };

    // Save the created location
    await newWorkLocation.save();
    res.status(201).json({
        success: true,
        data: newWorkLocation
    })
}));

// @desc Get all locations
// @route GET /all-locations
// @access Private
const getAllLocations = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Location.find({}).estimatedDocumentCount();

    // Find locations in DB
    const locations = await Location.find({})
        .skip(pageSize * (page - 1))
        .limit(pageSize)

    if (!locations) {
        const error = new CustomError("Locations not found!", 404);
        return next(error)
    };

    res.status(200).json({
        success: true,
        data: locations,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Query to get all locations
const queryAllLocations = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const locations = await Location.find({});

    if (!locations) {
        const error = new CustomError("Locations not found!", 404);
        return next(error)
    }
    res.status(200).json({
        success: true,
        data: locations
    });
}))

// @desc Delete location
// @route DELETE /delete/location/:id
// @access Private
const deleteLocation = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const locationId = req.params.id;
    const deleteLocation = await Location.findByIdAndDelete(locationId);

    if (!deleteLocation) {
        const error = new CustomError("Location not found!", 404);
        return next(error)
    };

    return res.status(200).json({
        success: true,
        message: "Location deleted successfully"
    });
}))

module.exports = {
    createLocation,
    getAllLocations,
    queryAllLocations,
    deleteLocation
};