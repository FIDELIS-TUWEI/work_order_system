const Location = require("../model/location"); 
const asyncHandler = require("express-async-handler");

// @desc Create locations
// @route POST /locations
// @access Private

const createLocation = asyncHandler(async (req, res) => {
    try {
        const newWorkLocation = new Location(req.body);
        await newWorkLocation.save();
        res.status(201).json({
            success: true,
            data: newWorkLocation
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
});

// @desc Get all locations
// @route GET /all-locations
// @access Private
const getAllLocations = asyncHandler(async (req, res) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Location.find({}).estimatedDocumentCount();
    try {
        const locations = await Location.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        if (!locations) {
            return res.status(400).json({ message: "No locations found" });
        }
        res.status(200).json({
            success: true,
            data: locations,
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
})

module.exports = {
    createLocation,
    getAllLocations
}